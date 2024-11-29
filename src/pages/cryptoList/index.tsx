import { requestUrls } from '../../util/constants/requestUrls';
import { useFetch } from '../../hooks/useFetch';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CurrencyListResponseModel } from '../../ts/types/CurrencyListResponseModel';
import { ROUTE_PATHS } from '../../util/constants/routes'; 

const CryptoList = () => {
    const navigate = useNavigate();

    const { data, loading, error } = useFetch<CurrencyListResponseModel[]>({
        url: `${requestUrls.coinsMarkets}/coins/markets?vs_currency=usd&per_page=10`,
        header: {
            'x-cg-demo-api-key': process.env.REACT_APP_CRYPTO_API_KEY
        }
    });

    // Todo move to useMemo
    const columns: TableProps<CurrencyListResponseModel>['columns'] = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (value) => {
                return (
                    <img src={value} width={50} height={50}/>
                )
            }
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Price Change 24',
            dataIndex: 'price_change_24h',
            key: 'price_change_24h'
        },
        {
            title: 'Price',
            dataIndex: 'current_price',
            key: 'current_price'
        },
    ]


    const handleNavigateDetailPage = (rowData: CurrencyListResponseModel) => {
       navigate(`${ROUTE_PATHS.CRYPTO_DETAIL}/${rowData.id}`);
    }

    return (
        <Table 
            columns={columns}
            loading={loading}
            dataSource={data || []}
            pagination={{
                total: 1000,
                onChange(page, pageSize) {
                    console.log(page)
                    console.log(pageSize, 'pageSize')
                },
            }}
            onRow={(row) => {
                return {
                    onClick: () => handleNavigateDetailPage(row)
                }
            }}
        />
    )
};

export default CryptoList;