import {Modal, Input, Collapse, Button} from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import {getCollectionWhereKeyValueSearch} from "@/config/firebase.config";
const { Panel } = Collapse;
import { exportToExcel } from 'react-json-to-excel';

export const FindEndExportUser = ({isModalOpen, setIsModalOpen}) => {
    
    const [searchEngineInFirebase, setSearchEngineInFirebase] = useState("");
    const [resultSearch, setResultSearch] = useState([]);
    const [searchType, setSearchType] = useState("email");
    
    useEffect(() => {
        if(searchEngineInFirebase === "") return;
        
        getCollectionWhereKeyValueSearch("users", searchType, searchEngineInFirebase)
            .then(res => {
                if(res.length === 0 && searchType === 'email'){
                    setSearchType("companyName")
                }else if(res.length === 0 && searchType === 'companyName'){
                    setSearchType("idPost")
                }else if(res.length === 0 && searchType === 'idPost'){
                    setSearchType("email")
                }else{
                    setResultSearch(res)
                }
            })
            .catch(e => console.log(e))
        
    }, [searchEngineInFirebase])
    
    const handleOk = () => {
        const dataExportExcel = []
        resultSearch.map((u, _) => {
            dataExportExcel.push({
                ...u,
                file: u.file.href,
                fileName: u.file.name
            })
        })
        exportToExcel(dataExportExcel, 'users')
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setResultSearch([]);
    };
    
    return(
        <Modal 
            title="Знайти та експортувати" 
            centered
            open={isModalOpen}
            okText="Експортувати все"
            cancelText="Закрити"
            onOk={handleOk} 
            onCancel={handleCancel}
            destroyOnClose
        >
            <div>
                <div className="flex items-center gap-4">
                    <Input onChange={(e) => setSearchEngineInFirebase(e.target.value)} size="large" placeholder="Введіть індетифікатор/емейл/ім'я компанії" prefix={<UserOutlined />} />
                    <Button onClick={() => setResultSearch([])}>Скинути</Button>
                </div>
                <hr className="my-4"/>
                <h2>Інформація за пошуком</h2>
                <Collapse className="mt-4">
                    {resultSearch.map((u, _) => (
                        <Panel header={`${u.email} | ${u.idPost}`} key={u.idPost}>
                            <ul className="mb-4">
                                <li>Емейл адреса: {u.email}</li>
                                <li>Ім'я компанії: {u.companyName}</li>
                                <li>Файл: <a target="_blank" href={u.file.href}>{u.file.name}</a></li>
                            </ul>
                            <Button type="dashed" onClick={() => exportToExcel([{...u, file: u.file.href, fileName: u.file.name}], u.companyName)}>Експортувати</Button>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </Modal>
    )
}