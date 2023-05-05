import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import {getCollectionOnLimit} from "@/config/firebase.config";
import {FindEndExportUser} from "@/components/features/modals/FindEndExportUser";
import { exportToExcel } from 'react-json-to-excel';

export const AllUsers = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    
    useEffect(() => {
        getCollectionOnLimit("users", 10).then((res) => {
            setData(res);
        })
    }, []);
    
    const exportsAllUsers = () => {
        const dataExportExcel = []
        data.map((u, _) => {
            dataExportExcel.push({
                ...u,
                file: u.file.href,
                fileName: u.file.name
            })
        })
        exportToExcel(dataExportExcel, 'usersAll')
    }
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Пошук`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{width: 90,}}>
                        Пошук
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{width: 90,}}>
                        Скинути
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Фільтр
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Закрити
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Ідентифікатор',
            dataIndex: 'idPost',
            key: 'idPost',
            width: '10%',
            ...getColumnSearchProps('idPost'),
        },
        {
            title: 'Електронна пошта',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Ім\'я компанії\n',
            dataIndex: 'companyName',
            key: 'companyName',
            width: '20%',
            ...getColumnSearchProps('companyName'),
        },
        {
            title: 'Файл',
            dataIndex: 'file',
            key: 'file',
            ...getColumnSearchProps('file'),
            sortDirections: ['descend', 'ascend'],
            width: '30%',
            render: (({href, name}) => (
                <>
                    <a target="_blank" href={href}>{name}</a>
                </>
            ))
        },
        {
            title: 'Дія\n',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={(e) => exportToExcel([{...record, file: record.file.href, fileName: record.file.name}], record.companyName)}>Експорт</a>
                </Space>
            ),
        },
    ];
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <>
            <FindEndExportUser 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen}
            />
            <div className="flex items-center gap-4 justify-end my-4">
                <Button className="text-black" type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>Знайти та експортувати</Button>
                {" | "}
                <Button className="text-black" type="primary" onClick={exportsAllUsers}>Експортувати все</Button>
            </div>
            <Table columns={columns} dataSource={data} />
        </>
    );
};