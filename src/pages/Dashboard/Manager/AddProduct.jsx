import { useEffect } from 'react';
import AddProductForm from '../../../components/Form/AddProductForm'

const AddProduct = () => {
  useEffect(() => {
    document.title = "Add Product | Dashboard";
  }, []);
  
  return (
    <div>
      <AddProductForm />
    </div>
  )
}

export default AddProduct
