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
export const generateQr = async (prod_code: any) => {
  return await Fetch.postJSON("/qr-code/generate-code", { prod_code });
};
//update call
export const updateQr = async (code: string) => {
  return await Fetch.updateJSON("/qr-code/updatecode", { code });
};
//get qr
export const getQr = async (code: any) => {
  return await Fetch.getJSON(`/qr-code/getcode?code=${code}`);
};
//get user
export const getAccountDetails = async (id: any) => {
  return await Fetch.getJSON(`/user-accounts/get-user?id=${id}`);
};
//update-account
export const UpdateAccountDetails = async ({
  id,
  email,
  name,
  phoneNumber,
  address,
  state,
  district,
  pincode,
  role,
}: any) => {
  return await Fetch.updateJSON("/user-accounts/update-user", {
    id,
    email,
    name,
    phoneNumber,
    address,
    state,
    district,
    pincode,
    role,
  });
};

//redeem-form
export const redeemForm = async ({
  userId,
  name,
  phoneNumber,
  amount,
  prod_code,
  date,
  city,
  count,
}: any) => {
  return await Fetch.postJSON("/redeem/redeem-form", {
    userId,
    name,
    phoneNumber,
    amount,
    prod_code,
    date,
    city,
    count,
  });
};

//get-all redeem
export const getAllredeem = async () => {
  return await Fetch.getJSON("/redeem/get-redeem");
};
//clear amount sended redeem
export const deleteRedeem = async (id: any) => {
  return await Fetch.deleteJSON("/redeem/clear-redeem", {
    id,
  });
};

//get-painters data
export const getAllusers = async () => {
  return await Fetch.getJSON("/painter-details/details");
};

//purchased product
export const purchasedProduct = async ({ name, date, city, count }: any) => {
  return await Fetch.postJSON("/purchased-products/product", {
    name,
    date,
    city,
    count,
  });
};
//get purchased item
export const getPurchasedProd = async () => {
  return await Fetch.getJSON("/purchased-products/get-product");
};