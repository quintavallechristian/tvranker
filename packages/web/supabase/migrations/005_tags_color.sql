-- Add color column to tags and update default tag colors

alter table public.tags
  add column if not exists color text not null default 'slate';

alter table public.tags
  add constraint tags_color_valid check (
    color in ('blue','green','pink','yellow','orange','purple','red','teal','indigo','slate')
  );

-- Update default tag colors
update public.tags set color = 'blue'   where name = 'serie tv'        and is_default = true;
update public.tags set color = 'pink'   where name = 'reality'         and is_default = true;
update public.tags set color = 'green'  where name = 'documentario'    and is_default = true;
update public.tags set color = 'yellow' where name = 'cartoni animati' and is_default = true;
update public.tags set color = 'orange' where name = 'anime'           and is_default = true;
