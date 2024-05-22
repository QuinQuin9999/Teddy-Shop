import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from "axios"; 
// import * as ProductService from '../../services/ProductService';
import { WrapperProducts, WrapperButtonMore, Container, WrapperDiv } from './style';
import CardProductComponent from '../../components/CardProductComponent/CardProductComponent';
import SelectPriceComponent from '../../components/SelectPriceComponent/SelectPriceComponent';
import SelectSizeComponent from '../../components/SelectSizeComponent/SelectSizeComponent';
import SelectColorComponent from '../../components/SelectColorComponent/SelectColorComponent';
import SelectMaterialComponent from '../../components/SelectMaterialComponent/SelectMaterialComponent';
// import FilterPriceComponent from '../../components/FilterPriceComponent/FilterPriceComponent';
// import SortComponent from '../../components/SortComponent/SortComponent';
// import FilterProducerComponent from '../../components/FilterProducerComponent/FilterProducerComponent';  

// const SearchPage = () => {
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const searchParams = new URLSearchParams(location.search);
//     const name = searchParams.get('name') || '';
//     // const producer = useSelector(state => state.product.selectedProducer); 
//     // const initialSort = searchParams.get('sort') || '';
//     const minPrice = searchParams.get('minPrice') || '0';
//     const maxPrice = searchParams.get('maxPrice') || '1000000000';

//     // const [limit, setLimit] = useState(10);
//     // const [sort, setSort] = useState(initialSort);
//     const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

//     const fetchProductsSearchAPI = async (name) => {
//         // const productId = '664768e8af3ad61a4c5287c0'
//         const response = await axios.get(`http://localhost:8083/api/v1/product/searchByName?productName=${name}`);
//         return response.data;
//     };

//     useEffect(() => {
//         dispatch(searchProductAction(name));
//     }, [name, dispatch]);

//     // useEffect(() => {
//     //     if (initialSort !== sort || priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
//     //         setSort(initialSort);
//     //         setPriceRange([minPrice, maxPrice]);
//     //     }
//     // }, [initialSort, minPrice, maxPrice, sort, priceRange]);

//     const { isLoading, data: products, error } = useQuery({
//         queryKey: ['products', name],
//         queryFn: () => fetchProductsSearchAPI(name),
//         retry: 3,
//         retryDelay: 1000
//     });
    
//     if (isLoading) return <div></div>;
//     if (error) return <div>Error fetching products: {error.message}</div>;

//     const renderSearchResultCount = () => {
//         // if (!name) {
//         //     return null;
//         // }
//         console.log('product', products?.length);
//         return products?.length > 0 ? (
//             <div style={{ paddingTop: '20px', fontSize: '16px', color: '#161617', marginLeft: '20px' }}>
//                 {(name !== '') && (<>Kết quả tìm kiếm cho <strong>"{name}"</strong>:</>)}
//             </div>
//         ) : (
//             <div style={{ margin: '20px 0', fontSize: '20px', marginLeft: '24px' }}>Không tìm thấy sản phẩm.</div>
//         );
//     };

//     return (
//         <WrapperDiv>
//             {renderSearchResultCount()}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0px auto', paddingTop: '20px', maxWidth: '1240px' }}>
//                 {products?.length > 0 && (
//                 <>
//                 <div style={{ display: 'flex', gap: '10px' }}> 
//                     <SelectPriceComponent/>
//                     {/* <FilterProducerComponent /> */}
//                 </div>
//                     {/* <SortComponent /> */}
//                 </>
//                 )} 
//             </div>
//             <WrapperProducts>
//                 {products?.map(product => (
//                     <CardProductComponent key={product.id} {...product} />
//                 ))}
//             </WrapperProducts>
//             {products?.length >= 10 && (
//                 <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//                     <WrapperButtonMore
//                     textButton="Xem thêm"
//                     type="outline"
//                     // onClick={() => setLimit(prev => prev + 10)}
//                     styleButton={{ border: '1px solid rgb(11,116,229)', width: '120px', height: '38px', borderRadius: '4px', marginBottom: '10px' }}
//                     styleTextButton={{ fontWeight: '500', color: 'rgb(11,116,229)' }}
//                 />
//                 </div>
//             )}
//         </WrapperDiv>
//     );
// };

// export default SearchPage;
const SearchPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name') || null;
    const minPrice = searchParams.get('minPrice') || '0';
    const maxPrice = searchParams.get('maxPrice') || '1000000000';
    const size = searchParams.get('size') || null;
    const color = searchParams.get('color') || null;
    const material = searchParams.get('material') || null;

    const fetchProductsSearchAPI = async (name, minPrice, maxPrice,size, color, material) => {
        const response = await axios.get(`http://localhost:8083/api/v1/product/search`, {
            params: {
                productName: name,
                minPrice: minPrice,
                maxPrice: maxPrice,
                size: size,
                color: color,
                material: material
            }
        });
        return response.data;
    };

    const { isLoading, data: products, error } = useQuery({
        queryKey: ['products', name, minPrice, maxPrice, size, color, material],
        queryFn: () => fetchProductsSearchAPI(name, minPrice, maxPrice, size, color, material),
        retry: 3,
        retryDelay: 1000
    });

    console.log('name', products)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products: {error.message}</div>;

    const renderSearchResultCount = () => {
        return products?.length > 0 ? (
            <div style={{ paddingTop: '20px', fontSize: '16px', marginLeft: '20px' }}>
                {(name !== null) && (<>Kết quả tìm kiếm cho <strong>"{name}"</strong>:</>)}
            </div>
        ) : (
            <div style={{ margin: '20px 0', fontSize: '20px', marginLeft: '24px' }}>Không tìm thấy sản phẩm.</div>
        );
    };

    return (
        <WrapperDiv>
            {renderSearchResultCount()}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0px auto', paddingTop: '20px', maxWidth: '1240px' }}>
                {products?.length > 0 && (
                <>
                <div style={{ display: 'flex', gap: '10px' }}> 
                    <SelectPriceComponent/>
                    <SelectSizeComponent/>
                    <SelectColorComponent/>
                    <SelectMaterialComponent/>
                </div>
                </>
                )} 
            </div>
            <WrapperProducts>
                {products?.map(product => (
                    <CardProductComponent key={product.id} {...product} />
                ))}
            </WrapperProducts>
            {/* {products?.length >= 10 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <WrapperButtonMore
                        textButton="Xem thêm"
                        type="outline"
                        // onClick={() => setLimit(prev => prev + 10)}
                        styleButton={{ border: '1px solid rgb(11,116,229)', width: '120px', height: '38px', borderRadius: '4px', marginBottom: '10px' }}
                        styleTextButton={{ fontWeight: '500', color: 'rgb(11,116,229)' }}
                    />
                </div>
            )} */}
        </WrapperDiv>
    );
};

export default SearchPage;