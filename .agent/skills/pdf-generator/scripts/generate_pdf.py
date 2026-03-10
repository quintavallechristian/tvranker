#!/usr/bin/env python3
"""
PDF Generator con intestazione scuola.

Genera documenti PDF con intestazione personalizzata della scuola,
supportando moduli con campi placeholder, documenti e certificati.

Dipendenze:
    pip install reportlab Pillow
"""

import argparse
import os
from io import BytesIO
from typing import Optional, Literal

try:
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import cm, mm
    from reportlab.platypus import (
        SimpleDocTemplate,
        Paragraph,
        Spacer,
        Image,
        Table,
        TableStyle,
        PageBreak,
    )
    from reportlab.pdfgen import canvas
    from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
except ImportError:
    print("❌ Errore: reportlab non installato.")
    print("   Esegui: pip install reportlab Pillow")
    exit(1)

try:
    from PIL import Image as PILImage
except ImportError:
    PILImage = None


DocumentType = Literal["modulo", "documento", "certificato"]


def create_styles() -> dict:
    """Crea stili personalizzati per il PDF."""
    styles = getSampleStyleSheet()
    
    # Stile titolo documento
    styles.add(ParagraphStyle(
        name='DocTitle',
        parent=styles['Heading1'],
        fontSize=16,
        alignment=TA_CENTER,
        spaceAfter=20,
        spaceBefore=20,
        fontName='Helvetica-Bold',
    ))
    
    # Stile intestazione scuola
    styles.add(ParagraphStyle(
        name='SchoolName',
        parent=styles['Normal'],
        fontSize=14,
        fontName='Helvetica-Bold',
        alignment=TA_LEFT,
    ))
    
    # Stile info contatto
    styles.add(ParagraphStyle(
        name='ContactInfo',
        parent=styles['Normal'],
        fontSize=9,
        fontName='Helvetica',
        alignment=TA_LEFT,
        textColor=colors.grey,
    ))
    
    # Stile corpo testo
    if 'BodyText' in styles:
        styles['BodyText'].fontSize = 11
        styles['BodyText'].fontName = 'Helvetica'
        styles['BodyText'].alignment = TA_JUSTIFY
        styles['BodyText'].spaceAfter = 12
        styles['BodyText'].leading = 14
    else:
        styles.add(ParagraphStyle(
            name='BodyText',
            parent=styles['Normal'],
            fontSize=11,
            fontName='Helvetica',
            alignment=TA_JUSTIFY,
            spaceAfter=12,
            leading=14,
        ))
    
    # Stile per campi compilabili
    styles.add(ParagraphStyle(
        name='FormField',
        parent=styles['Normal'],
        fontSize=11,
        fontName='Helvetica',
        alignment=TA_LEFT,
        spaceAfter=18,
        leading=20,
    ))
    
    # Stile firma
    styles.add(ParagraphStyle(
        name='Signature',
        parent=styles['Normal'],
        fontSize=11,
        fontName='Helvetica',
        alignment=TA_RIGHT,
        spaceBefore=30,
    ))
    
    return styles


def load_logo(logo_path: Optional[str], max_height: float = 1.5*cm) -> Optional[Image]:
    """Carica e ridimensiona il logo mantenendo l'aspect ratio."""
    if not logo_path or not os.path.exists(logo_path):
        return None
    
    try:
        if PILImage:
            # Usa PIL per ottenere le dimensioni
            with PILImage.open(logo_path) as img:
                orig_width, orig_height = img.size
                aspect = orig_width / orig_height
                new_height = max_height
                new_width = new_height * aspect
                return Image(logo_path, width=new_width, height=new_height)
        else:
            # Fallback senza PIL
            return Image(logo_path, height=max_height)
    except Exception as e:
        print(f"⚠️ Impossibile caricare il logo: {e}")
        return None


def create_header_table(
    school_name: str,
    school_address: Optional[str],
    school_phone: Optional[str],
    school_email: Optional[str],
    logo: Optional[Image],
    styles: dict
) -> Table:
    """Crea la tabella dell'intestazione con logo e info scuola."""
    
    # Costruisci il testo delle informazioni
    info_lines = [Paragraph(school_name, styles['SchoolName'])]
    
    contact_parts = []
    if school_address:
        contact_parts.append(f"📍 {school_address}")
    if school_phone:
        contact_parts.append(f"📞 {school_phone}")
    if school_email:
        contact_parts.append(f"✉️ {school_email}")
    
    if contact_parts:
        contact_text = " | ".join(contact_parts)
        info_lines.append(Paragraph(contact_text, styles['ContactInfo']))
    
    # Crea la tabella
    if logo:
        data = [[logo, info_lines]]
        col_widths = [2.5*cm, 14*cm]
    else:
        data = [[info_lines]]
        col_widths = [16.5*cm]
    
    table = Table(data, colWidths=col_widths)
    table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (0, 0), (0, 0), 'CENTER'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    
    return table


def create_separator() -> Table:
    """Crea una linea separatrice."""
    data = [['']]
    table = Table(data, colWidths=[16.5*cm])
    table.setStyle(TableStyle([
        ('LINEABOVE', (0, 0), (-1, 0), 1, colors.grey),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    return table


def add_form_fields(story: list, styles: dict, form_type: str = "standard"):
    """Aggiunge campi compilabili standard per i moduli."""
    
    fields = [
        "Io sottoscritto/a _____________________________________________",
        "nato/a a _________________________________ il ___/___/______",
        "residente in via _______________________________________ n. _____",
        "città _________________________________ (___) CAP ________",
        "codice fiscale ____________________________________________",
        "in qualità di genitore/tutore dell'alunno/a _________________________________",
        "classe _______ sezione _______",
    ]
    
    for field in fields:
        story.append(Paragraph(field, styles['FormField']))


def add_signature_section(story: list, styles: dict):
    """Aggiunge la sezione firma e data."""
    story.append(Spacer(1, 30))
    
    # Tabella firma e data
    data = [
        [
            Paragraph("Data ___/___/______", styles['BodyText']),
            Paragraph("Firma _________________________", styles['BodyText'])
        ]
    ]
    
    table = Table(data, colWidths=[8*cm, 8*cm])
    table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'BOTTOM'),
        ('ALIGN', (0, 0), (0, 0), 'LEFT'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
    ]))
    
    story.append(table)


def generate_pdf(
    output_path: str,
    school_name: str,
    title: str,
    content: str,
    doc_type: DocumentType = "documento",
    school_address: Optional[str] = None,
    school_phone: Optional[str] = None,
    school_email: Optional[str] = None,
    school_logo: Optional[str] = None,
    request_content: Optional[str] = None,
) -> str:
    """
    Genera un PDF con intestazione della scuola.
    
    Args:
        output_path: Percorso del file PDF di output
        school_name: Nome della scuola
        title: Titolo del documento
        content: Contenuto del documento (supporta HTML basilare)
        doc_type: Tipo di documento (modulo, documento, certificato)
        school_address: Indirizzo della scuola
        school_phone: Telefono della scuola
        school_email: Email della scuola
        school_logo: Percorso del logo della scuola
        request_content: Contenuto della richiesta (solo per moduli, appare dopo i campi dati)
    """
    
    # Crea directory se non esiste
    os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
    
    # Crea il documento
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm,
    )
    
    styles = create_styles()
    story = []
    
    # === INTESTAZIONE ===
    logo = load_logo(school_logo)
    header = create_header_table(
        school_name=school_name,
        school_address=school_address,
        school_phone=school_phone,
        school_email=school_email,
        logo=logo,
        styles=styles,
    )
    story.append(header)
    story.append(create_separator())
    
    # === TITOLO ===
    story.append(Paragraph(title.upper(), styles['DocTitle']))
    
    # === CONTENUTO ===
    # Suddividi il contenuto in paragrafi
    # Gestisci newline letterali se passati da riga di comando (es. \n)
    content = content.replace('\\n', '\n')
    paragraphs = content.split('\n\n')
    for para in paragraphs:
        if para.strip():
            story.append(Paragraph(para.strip(), styles['BodyText']))
    
    # === SEZIONI SPECIFICHE PER TIPO ===
    if doc_type == "modulo":
        story.append(Spacer(1, 20))
        add_form_fields(story, styles)
        
        # Aggiungi contenuto richiesta se presente
        if request_content:
            story.append(Spacer(1, 20))
            # Gestisci newline letterali
            request_content = request_content.replace('\\n', '\n')
            req_paragraphs = request_content.split('\n\n')
            for para in req_paragraphs:
                if para.strip():
                    story.append(Paragraph(para.strip(), styles['BodyText']))
        
        add_signature_section(story, styles)
    
    elif doc_type == "certificato":
        story.append(Spacer(1, 40))
        # Spazio per timbro
        story.append(Paragraph(
            "________________________________<br/>"
            "Timbro e Firma del Dirigente Scolastico",
            styles['Signature']
        ))
    
    else:  # documento
        add_signature_section(story, styles)
    
    # === GENERA IL PDF ===
    doc.build(story)
    
    print(f"✅ PDF generato: {output_path}")
    return output_path


def main():
    parser = argparse.ArgumentParser(
        description="Genera PDF con intestazione scuola",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Esempi:
  %(prog)s --school-name "Scuola Primaria Roma" --title "Autorizzazione" --content "Testo..." --output doc.pdf --type modulo
  %(prog)s --school-name "Istituto Comprensivo" --title "Circolare" --content "Avviso..." --output circ.pdf --type documento
        """
    )
    
    parser.add_argument('--school-name', required=True, help='Nome della scuola')
    parser.add_argument('--school-address', help='Indirizzo della scuola')
    parser.add_argument('--school-phone', help='Telefono della scuola')
    parser.add_argument('--school-email', help='Email della scuola')
    parser.add_argument('--school-logo', help='Percorso del logo della scuola')
    parser.add_argument('--title', required=True, help='Titolo del documento')
    parser.add_argument('--content', required=True, help='Contenuto del documento')
    parser.add_argument('--request-content', help='Contenuto della richiesta (solo per type=modulo, appare dopo i campi dati)')
    parser.add_argument('--output', required=True, help='Percorso del file PDF di output')
    parser.add_argument(
        '--type',
        choices=['modulo', 'documento', 'certificato'],
        default='documento',
        help='Tipo di documento (default: documento)'
    )
    
    args = parser.parse_args()
    
    generate_pdf(
        output_path=args.output,
        school_name=args.school_name,
        title=args.title,
        content=args.content,
        doc_type=args.type,
        school_address=args.school_address,
        school_phone=args.school_phone,
        school_email=args.school_email,
        school_logo=args.school_logo,
        request_content=args.request_content,
    )


if __name__ == '__main__':
    main()
