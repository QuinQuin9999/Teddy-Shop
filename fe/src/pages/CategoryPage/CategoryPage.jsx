import React, { useState, useEffect } from "react"
import { WrapperProducts, WrapperDiv } from './style';
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import CardProductComponent from '../../components/CardProductComponent/CardProductComponent';
import axios from "axios";

const CategoryPage = () => {

    const navigate = useNavigate();
    const params = useParams();
    const href = params.href;

    const fetchAllProducts = async () => {
        const response = await axios.get(`http://localhost:8083/api/v1/category/searchByHref/${href}`);
        return response.data;
      };
    
      const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchAllProducts,
        staleTime: 100,
    });

    return (
        <WrapperDiv>
            <WrapperProducts>
                {products?.list?.map(product => (
                    <CardProductComponent key={product.id} {...product} />
                ))}
            </WrapperProducts>
        </WrapperDiv>
    )
}

export default CategoryPage;