import Fetch from "./fetch";

//save products
export async function saveProducts({
  cat_name,
  name,
  amount,
  color,
  description,
  images,
}: any) {
  return Fetch.postJSON("/products/save-products", {
    cat_name,
    name,
    amount,
    color,
    description,
    images,
  });
}

//update product

export default function updateProd({
  cat_name,
  name,
  amount,
  color,
  description,
  images,
  cat_id,
  prod_id,
}: any) {
  return Fetch.updateJSON("/products/update", {
    cat_name,
    name,
    amount,
    color,
    description,
    images,
    cat_id,
    prod_id,
  });
}

//get products using category name
export async function getProducts() {
  return Fetch.getJSON(`/products/get-products`);
}

//uploads images

export async function uploadImage(fromdata: any) {
  console.log("fromdata", fromdata);
  return Fetch.postJSON(`/products/upload`, { fromdata });
}

//register user
export const registerNewuser = async ({
  email,
  password,
  role,
  name,
  image,
}: any) => {
  return await Fetch.postJSON("/register/register", {
    email,
    password,
    role,
    name,
    image,
  });
};

//generate qr code
export const generateQr = async () => {
  return await Fetch.postJSON("/qr-code/generate-code");
};
//update call
export const updateQr = async (code: string) => {
  console.log("code", code);
  return await Fetch.updateJSON("/qr-code/updatecode", { code });
};
//get qr
export const getQr = async (code: any) => {
  return await Fetch.getJSON(`/qr-code/getcode?code=${code}`);
};
