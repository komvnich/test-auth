import React from 'react'
import {Button, Form, Input, notification, Segmented, Upload} from 'antd';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {setDocumentToCollection, storage} from "@/config/firebase.config";
import {signUp} from "@/config/FIrebaseMethods/Auth";

export const RegMethod = () => {
    
    const [api, contextHolder] = notification.useNotification();
    const [nameFile, setNameFile] = React.useState('');
    const [urlFiled, setUrlFiled] = React.useState();
    const [typeReg, setTypeReg] = React.useState('Юридична особа');
    const [fileList, setFileList] = React.useState([]);

    const uploadFile = async (file) => {
        if(!file) return;
        const storageRef = ref(storage, `/files/${file.name}`);
        setNameFile(file.name)
        const uploadTask = uploadBytesResumable(storageRef, file);

        try {
            await uploadTask.on("state_changed", (snapshot) => {
            }, (err) => console.log(err), () => getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrlFiled(url)))
        } catch (error) {
            console.log(error);
        }
    }

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: `${message}`,
            description: `${description}`,
        });
    };

    const onFinish = async (values) => {
        
        await signUp(values.email, values.password)
            .then(res => {
                openNotificationWithIcon("success", 'Успіх!', 'Ви успішно зареєстрували свій обліковий запис')
                setDocumentToCollection('users', { ...values, password: null, file: urlFiled ? {href: urlFiled, name: nameFile} : {href: '', name: ''}, idPost: '' })
                    .then(res => res)
                    .catch(e => console.log(e));
                return res;
            })
            .catch(e => {
                if(e.code === 'auth/email-already-in-use'){
                    openNotificationWithIcon("error", 'Помилка!', 'Цей користувач вже зареєстрований')
                }else if(e.code === 'auth/weak-password'){
                    openNotificationWithIcon("error", 'Помилка!', 'Ведений пароль вами дуже слабкий! Ваш пароль має містити щонайменше 5 символів')
                }
            })
        
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        openNotificationWithIcon("error", 'Помилка!', 'Перевірте наведені вами дані')
    };

    const propsUpload = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: async (file) => {
            setFileList([file]);
            await uploadFile(file);
            return false;
        },
        fileList,
    };

    return(
        <>
            {contextHolder}
            <section className="mb-4">
            <Segmented onChange={(value) => setTypeReg(value)} defaultValue={'Юридична особа'} block options={[
                {
                    label: 'Фізична особа',
                    value: 'Фізична особа',
                    disabled: true,
                },
                {
                    label: 'Юридична особа',
                    value: 'Юридична особа',
                    disabled: false,
                },
            ]}/>
            </section>
        <Form
            name="basic"
            className="h-full"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >
            <label>Введіть Вашу електронну пошту</label>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Введіть Вашу електронну пошту',
                    },
                ]}
            >
                <Input type="email" />
            </Form.Item>

            <label>Введіть свій пароль</label>
            <Form.Item
                className="w-[100%]"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Введіть свій пароль від особистого кабінету',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            {typeReg === 'Юридична особа' && (
                <>
                    <label>Введіть назву вашої компанії</label>
                    <hr/>
                    <Form.Item
                        className="w-[100%]"
                        name="companyName"
                        rules={[
                            {
                                required: true,
                                message: 'Введіть назву вашої компанії',
                            },
                        ]}
                    >
                        <Input maxLength={25} showCount />
                    </Form.Item>
                    <div className="my-4">
                        <span>Формат файлів, що підтримується:
                            <span className="font-bold">.doc, .pdf</span>
                        </span>
                        <Upload maxCount={1} accept=".doc, .pdf" listType="picture-card" {...propsUpload}>
                            <span>виберіть <br/> файл</span>
                        </Upload>
                    </div>
                </>
                
            )}
            <Form.Item>
                <Button className="w-[100%]" type="dashed" htmlType="submit">
                    Зареєструватися
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}