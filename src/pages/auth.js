import {Tabs, Card} from "antd";
import {AUTH_TABS} from "@/constants/Tabs/AuthTabs";
import {useUserContext} from "@/context/AuthContext";
import router from 'next/router';
import {useEffect} from "react";

function Auth() {
    
    const {user, loading, error} = useUserContext();

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push('/dashboard/users')
            }
        }
    }, [user, loading]);
    
    return(
            <main className="bg-[#00b96b] min-h-[100vh] flex items-center justify-center">
                <span className="flex items-center justify-center h-[100%] w-[100%]">
                    <Card hoverable className="max-w-[500px] w-[100%] min-h-[550px]">
                        <section className="bg-[#fff] shadow-black h-[100%] h-[100%] p-4 max-w-[500px] w-[100%]">
                            <Tabs className="h-[100%]" type="card" defaultActiveKey="1" items={AUTH_TABS} />
                        </section>
                    </Card>
                </span>
            </main>
    )
}

export default Auth;