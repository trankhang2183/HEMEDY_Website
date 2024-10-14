"use client";

import SearchFilterHeader from "@components/manager/SearchFilterHeader";
import musicPodcast from "@services/music-podcast";

import {
  Spin,
  Table,
  Button,
  Avatar,
  Menu,
  Dropdown,
  TableProps,
  Modal,
  Form,
  Input,
  Upload,
} from "antd";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { IoIosMore } from "react-icons/io";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { handleActionNotSupport } from "@utils/global";
import {
  CreateMusicPodcastType,
  MusicPodcastType,
} from "@/types/music-podcast.type";
import { HealingPageType } from "@utils/enum";
import { PiPlus } from "react-icons/pi";
import { BiEdit, BiUpload } from "react-icons/bi";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@utils/config-firebase";
const { confirm } = Modal;

const Podcast = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<MusicPodcastType[]>([]);
  const [processingData, setProcessingData] = useState<MusicPodcastType[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchMusicPodcastList = async () => {
      if (session?.user.access_token) {
        setIsLoading(true);
        try {
          const responseGetAllCustomer =
            await musicPodcast.getAllMusicPodCastList();

          const filteredData = (responseGetAllCustomer || []).filter(
            (musicPodcast: MusicPodcastType) =>
              musicPodcast.category === HealingPageType.Podcast
          );

          setOriginalData(filteredData);
          setProcessingData(filteredData);
        } catch (error: any) {
          toast.error("Có lỗi khi tải dữ liệu");
          toast.error(error!.response?.data?.message);
          console.error("Có lỗi khi tải dữ liệu:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMusicPodcastList();
  }, [session?.user.access_token]);

  useEffect(() => {
    let updatedData = [...originalData];

    if (searchText) {
      updatedData = updatedData.filter((musicPodcast: MusicPodcastType) =>
        musicPodcast.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setProcessingData(updatedData);
  }, [searchText, originalData]);

  const handleClearFilters = () => {
    setSearchText("");
    setProcessingData(originalData);
  };

  const beforeUploadImage = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("Chỉ chấp nhận file hình ảnh vào ô này!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  const beforeUploadAudio = (file: File) => {
    const isAudio = file.type.startsWith("audio/");
    if (!isAudio) {
      toast.error("Chỉ chấp nhận file âm thanh vào ô này!");
    }
    return isAudio || Upload.LIST_IGNORE;
  };

  const handleUploadToFirebase = async (file: File, folder: string) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (values: any) => {
    setUploading(true);

    try {
      const imgUrl = await handleUploadToFirebase(
        values.img_file.file,
        "images"
      );
      const audioUrl = await handleUploadToFirebase(
        values.audio_file.file,
        "audios"
      );

      const newMusicPodcast: CreateMusicPodcastType = {
        author: values.author,
        name: values.name,
        type: "new",
        category: HealingPageType.Podcast,
        imgUrl: imgUrl,
        img_url: imgUrl,
        audioLink: audioUrl,
        audio_link: audioUrl,
      };

      const createdPodcast = await musicPodcast.createMusicPodcast(
        session?.user.access_token!,
        newMusicPodcast
      );

      toast.success("Bài hát đã được thêm thành công!");
      setOriginalData((prevData) => [...prevData, createdPodcast]);
      setProcessingData((prevData) => [...prevData, createdPodcast]);
      form.resetFields();
    } catch (error) {
      console.log("error:", error);
      toast.error("Có lỗi khi thêm podcast", { autoClose: 2000 });
    } finally {
      setUploading(false);
      setIsModalVisible(false);
    }
  };
  const columns: TableProps<any>["columns"] = [
    {
      title: "Tên podcast",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: MusicPodcastType) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={record.img_url}
            alt={record.img_url}
            style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
            size={55}
            shape="square"
          />
          <div>
            <div className="text-base">{record.name}</div>
            <div className="opacity-70">{record.author}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Lượt nghe",
      dataIndex: "listen_quantity",
      key: "listen_quantity",
    },
    {
      title: "Lượt yêu thích",
      dataIndex: "favorite_quantity",
      key: "favorite_quantity",
    },
    {
      title: "Ngày thêm vào",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (text: string, record: MusicPodcastType) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit">
              <Button
                type="link"
                onClick={() => {
                  handleActionNotSupport();
                }}
                icon={<BiEdit style={{ fontSize: "20px" }} />}
                style={{ color: "black" }}
                className="flex items-center"
              >
                Chỉnh sửa
              </Button>
            </Menu.Item>
            <Menu.Item key="delete">
              <Button
                type="link"
                onClick={async () => {
                  confirm({
                    cancelText: "Quay lại",
                    okText: "Xác nhận",
                    title: "Bạn có chắc muốn xoá podcast này?",
                    async onOk() {
                      try {
                        await musicPodcast.deleteMusicPodcast(
                          session?.user.access_token!,
                          record._id!
                        );
                        setOriginalData((prevData) =>
                          prevData.filter((item) => item._id !== record._id)
                        );
                        setProcessingData((prevData) =>
                          prevData.filter((item) => item._id !== record._id)
                        );

                        toast.success("Bài hát đã được xoá thành công!");
                      } catch (error: any) {
                        toast.error("Có lỗi xảy ra khi xoá podcast!", {
                          autoClose: 2000,
                        });
                        toast.error(error!.response?.data?.message, {
                          autoClose: 2000,
                        });
                      }
                    },
                    onCancel() {},
                  });
                }}
                icon={<FiTrash2 style={{ fontSize: "20px" }} />}
                style={{ color: "red" }}
                className="flex items-center"
              >
                Xóa podcast
              </Button>
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              type="link"
              icon={<IoIosMore style={{ fontSize: "24px" }} />}
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <div className="header-order">
        <SearchFilterHeader
          searchPlaceholder="Tìm kiếm podcast"
          searchValue={searchText}
          onSearchChange={setSearchText}
          handleClearFilters={handleClearFilters}
        />

        <div className="p-4">
          <Button icon={<PiPlus />} onClick={() => setIsModalVisible(true)}>
            Thêm podcast
          </Button>
          <Modal
            title="Thêm podcast mới"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            okText="Xác nhận đăng"
            cancelText="Huỷ"
            onOk={() => form.submit()}
            confirmLoading={uploading}
          >
            <Form
              form={form}
              onFinish={handleSubmit}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="name"
                label="Tên podcast"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập tên podcast" />
              </Form.Item>
              <Form.Item
                name="author"
                label="Tác giả"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập tên tác giả" />
              </Form.Item>
              <Form.Item
                name="img_file"
                label="Hình ảnh"
                rules={[{ required: true }]}
              >
                <Upload
                  beforeUpload={beforeUploadImage}
                  accept="image/*"
                  maxCount={1}
                >
                  <Button icon={<BiUpload />}>Tải lên ảnh</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="audio_file"
                label="File âm thanh"
                rules={[{ required: true }]}
              >
                <Upload
                  beforeUpload={beforeUploadAudio}
                  accept="audio/*"
                  maxCount={1}
                >
                  <Button icon={<BiUpload />}>Tải lên âm thanh</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <div className="mt-4 px-4">
        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={processingData}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Podcast;
