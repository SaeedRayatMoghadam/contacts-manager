import * as yup from 'yup';

export const contactSchema = yup.object().shape({
    fullname: yup.string().required("نام کامل را وارد کنید"),
    photo: yup.string().required("تصویر را وارد کنید"),
    mobile: yup.number().required("موبایل را وارد کنید").positive("موبایل نمیتواند منفی باشد"),
    email: yup.string().email("آدرس ایمیل معتبر نیست").required("ایمیل را وارد کنید"),
    job: yup.string().required("شغل را وارد کنید"),
    group: yup.string().required("گروه را انتخاب کنید")
});