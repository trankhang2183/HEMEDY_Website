import React, { useEffect, useState } from "react";
import { FaPlay, FaStepForward, FaStepBackward } from "react-icons/fa";
import { IoPauseOutline, IoReturnUpBack } from "react-icons/io5";
import { AiOutlineSound } from "react-icons/ai";
import { useRouter } from "next/router";

interface Props {
  list_podcast_music: any;
}

const PodcastMusicLayout: React.FC<Props> = (props) => {
  const { list_podcast_music } = props;

  const router = useRouter();
  const [durations, setDurations] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const fetchDurations = async () => {
      const newDurations = await Promise.all(
        list_podcast_music.map(async (item) => {
          const audio = new Audio(item.audioLink);
          return new Promise<number>((resolve) => {
            audio.onloadedmetadata = () => {
              resolve(Math.floor(audio.duration));
            };
          });
        })
      );
      setDurations(newDurations);
    };

    fetchDurations();
  }, []);

  useEffect(() => {
    if (audio) {
      const interval = setInterval(() => {
        setCurrentTime(Math.floor(audio.currentTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [audio]);

  const playAudio = (index: number) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(list_podcast_music[index].audioLink);
    newAudio.play();
    setAudio(newAudio);
    setCurrentIndex(index);
    setIsPlaying(true);

    newAudio.onended = () => {
      setIsPlaying(false);
      setCurrentIndex(null);
    };
  };

  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const continueAudio = () => {
    if (audio && currentIndex !== null) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const nextAudio = () => {
    if (currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % list_podcast_music.length;
      playAudio(nextIndex);
    }
  };

  const previousAudio = () => {
    if (currentIndex !== null) {
      const prevIndex =
        (currentIndex - 1 + list_podcast_music.length) %
        list_podcast_music.length;
      playAudio(prevIndex);
    }
  };

  return (
    <>
      <div className="content">
        <div className="container section-new-list">
          <h1 className="text-3xl font-semibold">Những bài hát mới</h1>
          <div className="field-name mt-7 mb-5 flex flex-row justify-between">
            <p className="font-semibold text-xl">Tên bài hát</p>
            <p className="font-semibold text-xl">Thời lượng</p>
          </div>
          <div className="list-music">
            {list_podcast_music.map((item, index) => (
              <div
                className="item flex flex-row justify-between items-center"
                key={index}
              >
                <div className="introduction-block flex flex-row gap-6">
                  <div className="relative">
                    <img
                      className="img-audio"
                      src={item.imgUrl}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div
                      className="play-button flex items-center justify-center cursor-pointer"
                      onClick={() => playAudio(index)}
                    >
                      <FaPlay className="icon w-8 h-8" />
                    </div>
                  </div>
                  <div className="name-author flex flex-col gap-2 justify-center">
                    <p className="font-semibold">{item.name}</p>
                    <p className="font-medium">{item.author}</p>
                  </div>
                </div>

                <p className="time font-semibold">
                  {durations[index]
                    ? `${Math.floor(durations[index] / 60)}:${(
                        "0" +
                        (durations[index] % 60)
                      ).slice(-2)}`
                    : "Đang tải..."}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="section-most-listen-list"></div>
      </div>
      {currentIndex !== null && (
        <div className="fixed bottom-0 left-0 right-0 audio-bottom px-7 py-4 ">
          <div className="grid grid-cols-3">
            <div className="flex items-center">
              <img
                src={list_podcast_music[currentIndex].imgUrl}
                alt={list_podcast_music[currentIndex].name}
                className="w-16 h-16 rounded-lg mr-4 object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-semibold text-white">
                  {list_podcast_music[currentIndex].name}
                </p>
                <p className="font-medium text-white">
                  {list_podcast_music[currentIndex].author}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center middle">
              <button
                onClick={previousAudio}
                className=" mx-2 cursor-pointer back-button action-button"
              >
                <FaStepBackward className="w-8 h-8" />
              </button>
              {isPlaying ? (
                <button
                  onClick={pauseAudio}
                  className="mx-2 flex items-center cursor-pointer pause-button action-button"
                >
                  <IoPauseOutline className="w-8 h-8" />
                </button>
              ) : (
                <button
                  onClick={continueAudio}
                  className=" mx-2 flex items-center justify-center pl-2 cursor-pointer continue-button action-button"
                >
                  <FaPlay className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={nextAudio}
                className="mx-2 cursor-pointer action-button next-button"
              >
                <FaStepForward className="w-8 h-8" />
              </button>
            </div>

            <div className="volume-button flex justify-end">
              <div className="w-1/3 flex flex-row items-center">
                <AiOutlineSound className="w-5 h-5 text-white font-bold" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  onChange={(e) => {
                    if (audio) {
                      const volume = Number(e.target.value) / 100;
                      audio.volume = volume;
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className=" w-full text-white mt-2 handle-time">
            <span className="time-run">{formatTime(currentTime)} / </span>
            <span>{formatTime(durations[currentIndex] || 0)}</span>
          </div>

          <div className="duration-bar relative">
            <input
              type="range"
              min="0"
              max={durations[currentIndex] || 0}
              value={currentTime}
              onChange={(e) => {
                if (audio) {
                  const seekTime = Number(e.target.value);
                  audio.currentTime = seekTime;
                  setCurrentTime(seekTime);
                }
              }}
            />

            <div
              className="progress-bar absolute"
              style={{
                width: `${
                  (currentTime / (durations[currentIndex] || 1)) * 100
                }%`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PodcastMusicLayout;
