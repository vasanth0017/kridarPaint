"use client";

// components/ProductForm.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import updateProd, { getProducts, saveProducts } from "@/services/apicall";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface Product {
  id: string;
  cat_name: string;
  name: string;
  price: number;
  color: string;
  description: string;
  images: string[];
}

interface Category {
  name: string;
  products: Product[];
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    cat_name: "",
    name: "",
    price: 0,
    color: "",
    description: "",
    images: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [cat_id, setCat_id] = useState("");
  const [prod_id, setProd_id] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data: any = await getProducts();
      setCategories(data);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const catName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      cat_name: catName,
      name: "",
      price: 0,
      color: "",
      description: "",
      images: [],
    }));

    setSelectedProduct(null);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    setProd_id(productId);
    if (!productId) {
      setSelectedProduct(null);
      return;
    }

    const cat: any = categories.find((cat) => cat.name === formData.cat_name);
    setCat_id(cat?.id);
    const product = cat?.products.find((p: any) => p.id === productId) || null;
    setSelectedProduct(product);

    if (product && cat) {
      setFormData({
        cat_name: cat?.name,
        name: product?.name,
        price: product?.price,
        color: product?.color,
        description: product?.description,
        images: product?.images,
      });
      //   setImageUrls(product.images);
      //   setIsEditing(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUploadingImages(true);
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));

    setImageUrls((prev) => [...prev, ...urls]);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...urls],
    }));

    setUploadingImages(false);
  };

  const removeImage = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    setFormData((prev) => ({
      ...prev,
      images: newUrls,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cat_name = formData?.cat_name;
      const name = formData?.name;
      const amount = formData?.price;
      const color = formData?.color;
      const description = formData?.description;
      const images = ["null"];
      console.log(cat_name,
        name,
        amount,
        color,
        description,
        images,)
      await saveProducts({
        cat_name,
        name,
        amount,
        color,
        description,
        images,
      });
      toast.success("Saved Successfully")
      // Reset form after successful submission
      setFormData({
        cat_name: "",
        name: "",
        price: 0,
        color: "",
        description: "",
        images: [],
      });
      setImageUrls([]);
      setIsEditing(false);
      setSelectedProduct(null);

      // Refetch products to update the list
      await fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };
  //handle update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cat_name = formData?.cat_name;
      const name = formData?.name;
      const amount = formData?.price;
      const color = formData?.color;
      const description = formData?.description;
      const images = formData?.images;

      await updateProd({
        cat_name,
        name,
        amount,
        color,
        description,
        images,
        cat_id,
        prod_id,
      });
      toast.success("Saved Successfully")
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setFormData({
      cat_name: "",
      name: "",
      price: 0,
      color: "",
      description: "",
      images: [],
    });
    setImageUrls([]);
    setIsEditing(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };
  //handle edit
  const handleEdit = () => {
    setIsEditing(true);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-secondary rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold mb-6 ">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h1>

          <Button onClick={isEditing ? () => setIsEditing(false) : handleEdit}>
            {isEditing ? "Create New Product" : "Edit Previous data"}
          </Button>
        </div>

        {/* Category and Product Selection */}
        {isEditing ? (
          <>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Category
                </label>
                <select
                  name="cat_name"
                  value={formData?.cat_name}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category?.name} value={category?.name}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Select Product to Edit
                </label>
                <select
                  value={selectedProduct?.id || ""}
                  onChange={handleProductChange}
                  className="w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={!formData.cat_name}
                >
                  <option value="">Select a product</option>
                  {formData?.cat_name &&
                    categories
                      .find((cat) => cat?.name === formData?.cat_name)
                      ?.products.map((product) => (
                        <option key={product?.id} value={product?.id}>
                          {product?.name}
                        </option>
                      ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium  mb-1">
                Categoery Name
              </label>
              <Input
                type="text"
                name="cat_name"
                value={formData?.cat_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium  mb-1">Amount</label>
              <Input
                type="number"
                name="price"
                value={formData?.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <Input
                type="text"
                name="color"
                value={formData?.color}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData?.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Images</label>
              <div className="flex items-center mb-4">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer py-2 px-4 border rounded-md shadow-sm text-sm font-medium"
                >
                  {uploadingImages ? "Uploading..." : "Upload Images"}
                </label>
              </div>

              {/* Image Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <div className="h-24 w-full bg-gray-100 rounded-md overflow-hidden">
                      <div className="relative h-full w-full">
                        <Image
                          src={url}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              onClick={handleCancel}
              className="px-4 py-2 border rounded-md shadow-sm text-sm font-mediu"
            >
              Cancel
            </Button>
            <Button
              onClick={isEditing ? handleUpdate : handleSubmit}
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium"
            >
              {isLoading
                ? "Saving..."
                : isEditing
                ? "Update Product"
                : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
