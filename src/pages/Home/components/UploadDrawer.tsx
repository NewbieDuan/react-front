import React, { FC, useState } from "react";
import { Form, Input, Button, Upload, Space, Drawer } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import Http from "../../../api/http";

import { UploadData } from "../../../types/common"


interface Props {
    isShowUpload: boolean;
    confirm: (data: any) => void;
    close: () => void;
}


const UploadDrawer: FC<Props> = (props) => {

    const [formData, setFormData] = useState<any>({})
    const drawerConfirm = () => {
        let form = new FormData()
        form.append('file', formData.file)
        form.append('name', formData.name)
        form.append('desc', formData.desc)
        Http.post('upload', form).then(res => {
            props.confirm(formData)
        })

    }
    const drawerClose = () => {
        props.close()
    }
    const onFormLayoutChange = (e: any) => {
        if ('file' in e) {
            e = { file: e.file.file }
        }
        Object.assign(formData, e)
        setFormData(formData)
    }
    // const onChange = function (e: any) {
    //     formData.file = e.file
    //     setFormData(formData)
    // }
    return (
        <Drawer
            title="文件上传"
            width={400}
            onClose={drawerClose}
            visible={props.isShowUpload}
            extra={
                <Space>
                    <Button onClick={drawerClose}>取消</Button>
                    <Button type="primary" onClick={drawerConfirm}>
                        确定
                    </Button>
                </Space>
            }
        >
            <Form
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
            >
                <Form.Item label="名称" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="描述" name="desc">
                    <Input />
                </Form.Item>
                <Form.Item label="上传" name='file'>
                    {/* <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle> */}
                    <Upload.Dragger name="files" beforeUpload={() => false} maxCount={1} >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
export default UploadDrawer