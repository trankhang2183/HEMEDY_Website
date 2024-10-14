import React, { useEffect, useState } from "react";
import PodcastMusicLayout from "@components/healingPageComponent/PodcastMusicLayout";
import { IoReturnUpBack } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { MusicPodcastType } from "@/types/music-podcast.type";
import { toast } from "react-toastify";
import musicPodcast from "@services/music-podcast";
import { HealingPageType } from "@utils/enum";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});


interface Props {}

const PodcastSection: React.FC<Props> = (props) => {
  const {} = props;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [podcastListData, setMusicListData] = useState<MusicPodcastType[]>([]);

  useEffect(() => {
    const fetchMusicPodcastList = async () => {
      setIsLoading(true);
      try {
        const responseGetAllMusicPodcast =
          await musicPodcast.getAllMusicPodCastList();

        const filteredAndSortedData = (responseGetAllMusicPodcast || [])
          .filter(
            (musicPodcast: MusicPodcastType) =>
              musicPodcast.category === HealingPageType.Podcast
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
              <h1 className="text-5xl pt-4">
                Podcast với những câu chuyện <br></br>và sự chia sẻ rất gần gủi
              </h1>
              <p className="color-white text-base pt-4 pb-7">
                Những lời tâm sự, chia sẻ thật lòng của những người đã vượt qua
                mọi thứ, biết đâu bạn sẽ thấy chính mình trong câu chuyện.
              </p>
              <Image
                src="/images/Mask group.png"
                width={1202}
                height={472}
                alt="avatar_doc" loading="lazy"
              />
            </div>

            <PodcastMusicLayout list_podcast_music={podcastListData} />
          </div>
        </div>
      }
    />
  );
};

export default PodcastSection;
