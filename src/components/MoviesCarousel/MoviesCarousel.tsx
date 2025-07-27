import { useEffect, useRef } from "react";
import "./MoviesCarousel.less";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { updateFeatured } from "../../store/dataSlice";

interface Movie {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  VideoUrl?: string;
  Description: string;
}

export default function MoviesCarousel() {
  const movies = useSelector(
    (state: RootState) => state.dataSlice.trendingNow
  ) as Movie[];
  const dispatch = useDispatch();

  const handleClick = (movie: Movie) => {
    dispatch(updateFeatured(movie));
    sessionStorage.setItem("movieId", movie.Id.toString());
  };

  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      let isScrolling = false;
      let startX = 0;
      let startY = 0;
      let scrollLeft = 0;
      let scrollTop = 0;

      const onTouchStart = (e: TouchEvent) => {
        isScrolling = true;
        startX = e.touches[0].pageX - el.offsetLeft;
        startY = e.touches[0].pageY - el.offsetTop;
        scrollLeft = el.scrollLeft;
        scrollTop = el.scrollTop;
      };

      const onTouchMove = (e: TouchEvent) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.touches[0].pageX - el.offsetLeft;
        const y = e.touches[0].pageY - el.offsetTop;
        const distanceX = x - startX;
        const distanceY = y - startY;
        el.scrollLeft = scrollLeft - distanceX;
        el.scrollTop = scrollTop - distanceY;
      };

      const onTouchEnd = () => {
        isScrolling = false;
      };

      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 3,
          behavior: "smooth",
        });
      };

      el.addEventListener("touchstart", onTouchStart);
      el.addEventListener("touchmove", onTouchMove);
      el.addEventListener("touchend", onTouchEnd);
      el.addEventListener("wheel", onWheel);

      return () => {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchmove", onTouchMove);
        el.removeEventListener("touchend", onTouchEnd);
        el.removeEventListener("wheel", onWheel);
      };
    }
  }, []);

  return (
    <div className="rowBlock">
      <div className="row">
        <h2>Trending Now</h2>
        <div className="row__posters" ref={elRef}>
          {movies.map((movie) => (
            <img
              className="row__poster"
              key={movie.Id}
              src={`/assets/${movie.CoverImage}`}
              alt={movie.Title ?? ""}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
