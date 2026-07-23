import Hero from "@/components/Hero";
import Platforms from "@/components/Platforms";
import Releases from "@/components/Releases";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Sponsor from "@/components/Sponsor";
import Story from "@/components/Story";
import TrackPlayer from "@/components/TrackPlayer";
import UpcomingRelease from "@/components/UpcomingRelease";
import { getUserTrackStats } from "@/lib/soundcloud";

export default async function Home() {
  let stats = {};
  try {
    stats = await getUserTrackStats();
  } catch (error) {
    console.error("SoundCloud stats unavailable", error);
  }

  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <UpcomingRelease />
        <TrackPlayer stats={stats} />
        <Releases />
        <Story />
        <Platforms />
        <Sponsor />
      </main>
      <SiteFooter />
    </>
  );
}
