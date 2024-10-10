import React, { useEffect, useState } from "react";
import { IoPauseOutline, IoReturnUpBack } from "react-icons/io5";
import Image from "next/image";
import PodcastMusicLayout from "@components/healingPageComponent/PodcastMusicLayout";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const list_podcast_music = [
  {
    name: "Fur Elise classical piano",
    author: "CalvinClavier",
    category: "music",
    imgUrl:
      "https://vietthuongshop.vn/upload/content/images/loi-ich-cua-viec-choi-piano-doi-voi-tri-nao(3).jpg",
    audioLink:
      "https://firebasestorage.googleapis.com/v0/b/hemedy-project.appspot.com/o/fur-elise-classical-piano-241538.mp3?alt=media&token=3f42367e-99d2-473a-ad12-53ab96127f0e",
  },
  {
    name: "In the forest",
    author: "CalvinClavier",
    category: "music",
    imgUrl:
      "https://learnenglishteens.britishcouncil.org/sites/teens/files/field/image/rs930_135120665-low_0.jpg",
    audioLink:
      "https://firebasestorage.googleapis.com/v0/b/hemedy-project.appspot.com/o/in-the-forest-ambient-acoustic-guitar-instrumental-background-music-for-videos-5718.mp3?alt=media&token=b465c9e7-2ec3-4f58-976c-f2e78b058fb4",
  },
  {
    name: "Just relax",
    author: "CalvinClavier",
    category: "music",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHoR4FaBjxSgPP_6SFgSayOsu3p9daAOHJVw&s",
    audioLink:
      "https://firebasestorage.googleapis.com/v0/b/hemedy-project.appspot.com/o/just-relax-11157.mp3?alt=media&token=c7e921ac-1863-4290-b828-791fbee38087",
  },
  {
    name: "Let it go",
    author: "CalvinClavier",
    category: "music",
    imgUrl:
      "https://i.ytimg.com/vi/p43PgvpMdgg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBXKMGXcQiOcxCa2o_jXG3YHnmP3A",
    audioLink:
      "https://firebasestorage.googleapis.com/v0/b/hemedy-project.appspot.com/o/let-it-go-12279.mp3?alt=media&token=143308e0-e58c-48be-87d0-fb851c590584",
  },
  {
    name: "Waltz in A Minor - Chopin (Classical Piano)",
    author: "CalvinClavier",
    category: "music",
    imgUrl:
      "https://trungtamamnhacnguyenson.com/upload/news/the-life-story-of-frederic-chopin-7863.jpg",
    audioLink:
      "https://firebasestorage.googleapis.com/v0/b/hemedy-project.appspot.com/o/waltz-in-a-minor-chopin-classical-piano-216329.mp3?alt=media&token=274c4864-f165-4027-8688-899d4ffb8692",
  },
  {
    name: `Quan niệm về "dân chơi"`,
    author: "Hà Anh Tuấn",
    category: "podcast",
    imgUrl: "https://i.ytimg.com/vi/pbdc-mJ-a5w/maxresdefault.jpg",
    audioLink:
      "https://firebasestorage.googleapis.com/v0/b/hemedy-project.appspot.com/o/Y2meta.app%20-%20H%C3%A0%20Anh%20Tu%E1%BA%A5n%20c%C3%B3%20nhi%E1%BB%81u%20quan%20%C4%91i%E1%BB%83m%20gi%E1%BB%91ng%20b%C3%A0%20Nguy%E1%BB%85n%20Ph%C6%B0%C6%A1ng%20H%E1%BA%B1ng.!!!%20(128%20kbps).mp3?alt=media&token=5c53bf19-a1e3-4fec-b1e7-eb35dabeb46f",
  },
  {
    name: `Người lớn cô đơn`,
    author: "Giang ơi",
    category: "podcast",
    imgUrl: "https://giangoi.com/wp-content/uploads/2018/01/giang-oi.jpg",
    audioLink:
      "https://firebasestorage.googleapis.com/v0/b/hemedy-project.appspot.com/o/Y2meta.app%20-%20Ng%C6%B0%E1%BB%9Di%20l%E1%BB%9Bn%20c%C3%B4%20%C4%91%C6%A1n%20_%20Giang%20%C6%A0i%20Radio%20(128%20kbps).mp3?alt=media&token=eb351fcd-eca4-4df5-9fc1-f3bbbebfc8cd",
  },
];

interface Props {}

const MusicSection: React.FC<Props> = (props) => {
  const {} = props;
  const router = useRouter();

  const list_music = list_podcast_music.filter(
    (item) => item.category === "music"
  );

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

            <PodcastMusicLayout list_podcast_music={list_music} />
          </div>
        </div>
      }
    />
  );
};

export default MusicSection;
