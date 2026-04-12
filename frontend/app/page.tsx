import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/data/events";
import EventCard from "@/components/EventCard";
const Home = () => {
  return (
    <section>
      <h1 className="text-center">
        Discover, Track & Showcase Your Tech Journey
      </h1>
      <p className="text-center mt-5">
        Hackathons, internships, coding contests & opportunities — all in one
        place.
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
