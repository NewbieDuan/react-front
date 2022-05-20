import React, { FC, useEffect, useState } from "react";
import { Input, Button, Select, Table, Tag, Space, Drawer } from "antd";
import UploadDrawer from "./components/UploadDrawer";
import "./Home.scss"
import { File } from "../../types/common";
import http from "../../api/http";

const { Option } = Select;
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '大小',
        dataIndex: 'size',
        key: 'size',
    }, {
        title: '文件类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text: string, file: File) => (
            <Space size="middle">
                <span>{new Date(+file.createTime).toISOString()}</span>
            </Space>
        )
    },
    // {
    //     title: '标签',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (tags: string[]) => (
    //         <>
    //             {tags.map(tag => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    {
        title: '操作',
        key: 'action',
        render: (text: string, file: File) => (
            <Space size="middle">
                <a href="javascript:void(0)" onClick={() => downFile(file)}>download</a>
                <a href="javascript:void(0)" onClick={() => deleteFile(file)}>Delete</a>
            </Space>
        ),
    },
];
const downFile = function (file: File) {
    http.download({ id: file.id }).then(res => {
    })
}
const deleteFile = function (file: File) {
    http.post('deleteFile', { id: file.id })
}

const Home: FC = () => {
    const [searchForm, setSearchForm] = useState({ name: '', type: '' })
    const [fileTypeList, setFileTypeList] = useState<File[]>([]);
    const [fileList, setFileList] = useState<File[]>([]);
    const [isShowUpload, setShowUpload] = useState(false)

    const nameSearch = (val: string): void => {
        searchForm.name = val
        setSearchForm(searchForm);
    }
    const typeSelect = (val: string): void => {
        searchForm.type = val
        setSearchForm(searchForm);
    }
    const search = (): void => {
        http.post('getFileList', searchForm).then(res => {
            setFileList(res.data)
        });
    }
    const drawerConfirm = (): void => {
        setShowUpload(false)
    }
    const drawerClose = (): void => {
        setShowUpload(false)
    }

    useEffect(() => {
        http.post('getFileList', searchForm).then(res => {
            setFileList(res.data)
        });
        http.post('getFileTypeList').then(res => {
            setFileTypeList(res.data)
        });
    }, [])

    return (
        <div className="home-page">
            <div className="home-container">
                <div className="home-title">文件管理</div>
                <div className="home-search">
                    <Input className="search-item" placeholder="输入文件名称" allowClear onChange={(e) => nameSearch(e.target.value)} style={{ width: 200 }} />
                    <Select className="search-item" placeholder="选择文件类型" allowClear onChange={typeSelect} style={{ width: 200 }}>
                        {fileTypeList.map((item, index) => {
                            return <Option key={index} value={item.type}>{item.type}</Option>
                        })}
                    </Select>
                    <Button className="search-item" type="primary" onClick={search}>查询</Button>
                    <Button className="search-item" type="primary" onClick={() => setShowUpload(true)}>上传</Button>
                </div>
                <Table columns={columns} dataSource={fileList} />
            </div>
            <UploadDrawer isShowUpload={isShowUpload} confirm={drawerConfirm} close={drawerClose} />
        </div>
    )
}
export default Home  