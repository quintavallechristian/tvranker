import { redirect } from "next/navigation";
import { getHomeData } from "./actions";
import { HomeClient } from "./page-client";

export default async function HomePage() {
  const data = await getHomeData();

  if (!data) redirect("/login");

  return <HomeClient data={data} />;
}
