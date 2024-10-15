import React, { useEffect, useState } from "react";
import { IoPauseOutline, IoReturnUpBack } from "react-icons/io5";
import Image from "next/image";
import PodcastMusicLayout from "@components/healingPageComponent/PodcastMusicLayout";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import musicPodcast from "@services/music-podcast";
import { toast } from "react-toastify";
import { MusicPodcastType } from "@/types/music-podcast.type";
import { HealingPageType } from "@utils/enum";
import { Spin } from "antd";
import { scrollToElement } from "@utils/global";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

interface Props {}

const MusicSection: React.FC<Props> = (props) => {
  const {} = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [musicListData, setMusicListData] = useState<MusicPodcastType[]>([]);

  useEffect(() => {
    const fetchMusicPodcastList = async () => {
      setIsLoading(true);
      try {
        const responseGetAllMusicPodcast =
          await musicPodcast.getAllMusicPodCastList();

        const filteredAndSortedData = (responseGetAllMusicPodcast || [])
          .filter(
            (musicPodcast: MusicPodcastType) =>
              musicPodcast.category === HealingPageType.Music
          )
          .sort(
            (a: MusicPodcastType, b: MusicPodcastType) =>
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime()
          );

        setMusicListData(filteredAndSortedData);
      } catch (error: any) {
        toast.error("Có lỗi khi tải dữ liệu");
        toast.error(error!.response?.data?.message);
        console.error("Có lỗi khi tải dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusicPodcastList();
  }, []);

  return (
    <HomeLayoutNoSSR
      content={
        <div className="package-music-page">
          <div className="music-page">
            <div className="banner text-center pb-10">
              <div className="container">
                <button
                  className="back-button-return flex items-center gap-3 justify-center"
                  onClick={() => router.push("/healing")}
                >
                  <IoReturnUpBack />
                  Quay lại
                </button>
              </div>
              <p className="font-semibold text-lg color-white pt-8">
                Tạo nên sự cân bằng và thư giãn{" "}
              </p>
              <h1 className="text-5xl pt-4">
                Chữa lành tinh thần bằng <br></br>âm nhạc
              </h1>
              <p className="color-white text-base pt-4 pb-7">
                Khám phá các dịch vụ âm nhạc giúp bạn thư giãn và cân bằng cuộc
                sống tại Hemedy.
              </p>
              <Image
                src="/images/healing_area.png"
                width={1202}
                height={472}
                alt="avatar_doc"
                loading="lazy"
              />
            </div>

            {isLoading ? (
              <div className="content">
                <div className="container section-new-list">
                  <h1
                    className="text-3xl font-semibold"
                    id="play-list-podcast-music"
                  >
                    Những bài hát mới
                  </h1>
                  <div
                    className="field-name mt-7 mb-5 flex flex-row justify-between"
                  >
                    <p className="font-semibold text-xl">Tên bài hát</p>
                    <p className="font-semibold text-xl">Thời lượng</p>
                  </div>
                </div>

                <div className="container flex justify-center items-center mt-6 h-[500px]">
                  <Spin spinning={isLoading} />
                </div>
              </div>
            ) : (
              <PodcastMusicLayout list_podcast_music={musicListData} />
            )}
          </div>
        </div>
      }
    />
  );
};

export default MusicSection;
