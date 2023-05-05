import {Button, Form, Input, notification} from 'antd';
import {signIn} from "@/config/FIrebaseMethods/Auth";

export const AuthMethod = () => {

    const [api, contextHolder] = notification.useNotification();
    
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: `${message}`,
            description: `${description}`,
        });
    };

    const onFinish = async (values) => {
        await signIn(values.email, values.password)
            .then(res => openNotificationWithIcon("success", 'Успіх!', 'Ви успішно авторизувалися'))
        .catch(e => {
            if(e.code === 'auth/user-not-found'){
                openNotificationWithIcon("error", 'Помилка!', 'Цей користувач не знайдено в базі даних')
            }
            else if(e.code === 'auth/wrong-password'){
                openNotificationWithIcon("error", 'Помилка!', 'Ви ввели неправильно пароль від цього облікового запису')
            }
            else if(e.code === 'auth/too-many-requests'){
                openNotificationWithIcon("error", 'Помилка!', 'Занадто багато запитів, cпробуй пізніше')
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return(
        <>
            {contextHolder}
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
            <Form.Item className="mt-[50%]">
                <Button className="w-[100%]" type="dashed" htmlType="submit">
                    Увiйти
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}