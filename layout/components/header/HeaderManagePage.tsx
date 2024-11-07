import useDispatch from "@hooks/use-dispatch";
import notification from "@services/notification";
import { setSliderMenuItemSelectedKey } from "@slices/global";
import { ROLE_ADMIN } from "@utils/constants";
import { toastError } from "@utils/global";
import { Avatar, Badge, Space } from "antd";
import moment from "moment";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import {
  IoIosLogOut,
  IoIosNotificationsOutline,
  IoMdNotifications,
} from "react-icons/io";
import { IoCheckmarkDone, IoPersonCircleOutline } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";

// const callback_url = "http://localhost:3000/manage";
const callback_url = "http://hemedy.onrender.com/manage";

const HeaderManagePage = () => {
  const route = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const notificationRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any>([]);
  const [newNotifyCount, setNewNotifyCount] = useState<number>(0);

  const seenAllNotifications = async () => {};

  const seenNotification = async (id: number) => {};

  useEffect(() => {
    if (session?.user?.roles) {
      document.title = `Hemedy | ${session.user.roles}`;
    } else {
      document.title = "Hemedy";
    }
  }, [session?.user?.roles]);

  useEffect(() => {
    const fetchMusicPodcastList = async () => {
      if (session?.user.access_token) {
        try {
          const responseGetNotifications =
            await notification.getAllNotification(session?.user.access_token);
          console.log(
            "responseGetNotifications: ",
            responseGetNotifications[1]
          );
          setNewNotifyCount(responseGetNotifications[0]);
          setNotifications(responseGetNotifications[1]);
        } catch (error: any) {
          toastError(error);
          console.error("Có lỗi khi tải dữ liệu noti:", error);
        } finally {
        }
      }
    };

    fetchMusicPodcastList();
  }, [session?.user.access_token]);

  useEffect(() => {
    if (pathname) {
      const cleanPath = pathname.replace(/^\//, "");

      dispatch(setSliderMenuItemSelectedKey(cleanPath));
    }
  }, [pathname, dispatch]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       notificationRef.current &&
  //       !notificationRef.current.contains(event.target as Node)
  //     ) {
  //       setShowNotification(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div
      className="header-manage-page"
      style={{ borderBottom: "1px solid black" }}
    >
      <div className="flex justify-between flex-row mx-5 my-3">
        <div className="left flex justify-between flex-row items-center gap-4">
          <Image
            src="/images/logo-with-green-text.png"
            width={40}
            height={50}
            alt="logo"
            loading="lazy"
            onClick={() => {
              route.push("/admin/dashboard");
            }}
            className="cursor-pointer"
          />
          <div className="break-line"></div>
          <p className="role-name font-bold text-lg">
            {session?.user.roles === ROLE_ADMIN ? "My admin" : "My doctor"}
          </p>
        </div>

        <div className="right flex justify-between flex-row items-center gap-2">
          <Space
            className="m-2 hover:cursor-pointer relative"
            onClick={() => {
              setShowNotification(!showNotification);
            }}
          >
            <Badge count={newNotifyCount}>
              <Avatar
                className="bg-white hover:bg-[#e3eced]/50 flex justify-center items-center"
                style={{ borderColor: "#ffa412" }}
                shape="circle"
                icon={
                  <IoIosNotificationsOutline
                    style={{ color: "#ffa412" }}
                    className="w-6 h-6"
                  />
                }
              />
            </Badge>
          </Space>

          <>
            {showNotification && (
              <div
                ref={notificationRef}
                className=" top-[80px] right-28 z-20 absolute w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow"
                aria-labelledby="dropdownNotificationButton"
              >
                <div className="block px-4 py-2 relative font-medium text-center text-[#01a0e9] rounded-t-lg bg-gray-50">
                  Thông báo
                  <div
                    className="absolute top-2 right-3"
                    onClick={seenAllNotifications}
                  >
                    <IoCheckmarkDone className="w-5 h-5 cursor-pointer" />
                  </div>
                </div>
                <InfiniteScroll
                  dataLength={notifications?.length!}
                  next={() => {}}
                  height={"36rem"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  // hasMore={Boolean(pageIndexNoti < totalPageNoti)}
                  hasMore={false}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="scrollableDiv"
                >
                  <div className="divide-y divide-gray-100">
                    {notifications?.map((noti, index) => (
                      <div
                        key={index}
                        className={`h-fit flex px-4 py-3 hover:bg-gray-100 hover:cursor-pointer
                  ${!noti.seen && "bg-blue-100"} `}
                        onClick={() => {
                          seenNotification(noti.id);
                        }}
                      >
                        <div className="w-full pl-2">
                          <div className="text-gray-500 text-sm mb-1.5">
                            <span className="font-semibold text-gray-900">
                              {`${noti.title} `}
                            </span>
                          </div>
                          <div className="text-gray-500 text-sm mb-1.5">
                            <span className="text-gray-900">{`${noti.body} `}</span>
                          </div>
                          <div
                            className={`text-xs ${
                              noti.seen ? "text-gray-600" : "text-blue-600"
                            } `}
                          >
                            {moment(noti.dateCreated).hour() > 1
                              ? moment(noti.dateCreated).fromNow()
                              : moment(noti.dateCreated)
                                  .locale("en")
                                  .format("MMM DD HH:mm")}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-5 h-5 bg-white-600 border border-white rounded-full">
                            <FaDotCircle
                              onClick={
                                () => {
                                  !noti.seen && seenNotification(noti.id!);
                                }
                                // !noti.seen && seenNotification(noti.id!)
                              }
                              color={` ${noti.seen ? "gray" : "#01a0e9"}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            )}
          </>

          <div
            className="btn-logout font-semibold flex justify-between flex-row items-center gap-2"
            onClick={() => {
              signOut({ callbackUrl: `${callback_url}` });
            }}
          >
            <IoIosLogOut className="icon font-semibold" />
            Đăng xuất
          </div>

          <div className="profile flex justify-between flex-row items-center">
            <div className="name text-center font-semibold text-base">
              {session?.user.name || session?.user.fullname}
            </div>
            <div className="icon-person flex justify-center items-center">
              <IoPersonCircleOutline className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderManagePage;
