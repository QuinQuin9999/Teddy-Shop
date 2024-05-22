import React, { useState, useEffect } from "react";
import { FlexContainer, ProductDetailContainer, ProductDetailPart , WrapperProducts, ReviewContainer, RelatedProductsContainer} from "./style";
import Info from "../../components/ProductDetail/Info/Info";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import CardProductComponent from "../../components/CardProductComponent/CardProductComponent";
import ReviewComponent from "../../components/ReviewComponent/ReviewComponent";
// import Review from "../../components/Review";

function ProductDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;

  const [otherProducts, setOtherProducts] = useState([]);
  const [needReload, setNeedReload] = useState(false);

  const fetchProductDetailAPI = async () => {
    const response = await axios.get(`http://localhost:8083/api/v1/product/search/${productId}`);
    return response.data;
  };

  const { data: product, isLoading: isLoadingProduct, error: errorProduct, refetch: refetchProduct } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProductDetailAPI
  });

  const fetchOtherProductsAPI = async () => {
    const response = await axios.get(`http://localhost:8083/api/v1/product/searchByType?productType=${product.productType}`);
    console.log("Other Products API Response:", response.data);
    return response.data;
  };

  const { data: otherProductsData, isLoading: isLoadingOtherProducts, error: errorOtherProducts, refetch: refetchOtherProducts } = useQuery({
    queryKey: ["otherProducts", productId],
    queryFn: fetchOtherProductsAPI
  });

  const handleOther = (id) => {
    navigate(`/ProductDetail/${id}`);
    setNeedReload(true);
  };

  useEffect(() => {
    if (needReload) {
      refetchProduct();
      refetchOtherProducts();
      setNeedReload(false);
    }
  }, [needReload, refetchProduct, refetchOtherProducts]);

  const otherProductsFiltered = otherProductsData?.filter(otherProduct => otherProduct.id !== productId);

  if (isLoadingProduct || isLoadingOtherProducts) {
    return <div></div>;
  }

  if (errorProduct || errorOtherProducts) {
    return <div>Error loading data</div>;
  }

  return (
    <ProductDetailContainer className="product-detail">
      <div>
        <ProductDetailPart>
          {product && <Info productId={productId} />}
        </ProductDetailPart>
      </div>
      <FlexContainer>
        <ReviewContainer>
          <h3 style={{ fontSize: '20px', marginTop: '8px', marginLeft: '20px', marginBottom: '0px'}}>Reviews</h3>
          <ReviewComponent productId={productId} />
        </ReviewContainer>
        <RelatedProductsContainer>
          <h3 style={{ fontSize: '20px', marginTop: '10px', marginLeft: '20px', marginBottom: '0px'}}>Sản phẩm liên quan</h3>
          <WrapperProducts>
            {otherProductsFiltered?.map(otherProduct => (
              <CardProductComponent key={otherProduct.id} {...otherProduct} onClick={() => handleOther(otherProduct.id)} />
            ))}
          </WrapperProducts>
        </RelatedProductsContainer>
      </FlexContainer>
    </ProductDetailContainer>
  );
}

export default ProductDetailPage;
