import { configureStore } from "@reduxjs/toolkit";
import GetCustomerTypeSlice from "../Services/GetCustomerTypes/GetCustomerTypeSlice";
import LoginSlice from "../Services/LoginService/LoginSlice";
import RegisterSlice from "../Services/RegisterService/RegisterSlice";
import CustomerProfileSlice from "../Services/GetCustomerProfile/CustomerProfileSlice";
import VerifyOtpSlice from "../Services/ForgetPassWordService/VerifyOTP/VerifyOtpSlice";
import GetOtpSlice from "../Services/ForgetPassWordService/VerifyOTP/GetOtp/GetOtpSlice";
import GetNotifiationSlice from "../Services/NotificationService/NotificationSlice";
import DeviceLogSlice from "../Services/DeviceLogService/DeviceSlice";
import GetPointsSlice from "../Services/GetPointsService/GetPointSlice";
import GetSalesHistorySlice from "../Services/GetSalesHistory/SalesHistorySlice";
import GetVouchersSlice from "../Services/GetVoucherService/GetVoucherSlice";
import GetCouponSlice from "../Services/GetCouponService/GetCouponSlice";
import checkNewLoginId from "../Services/NewLoginIdService/NewLoginSlice";
import redeemVoucher from "../Services/RedeemVoucherServices/RedeemVoucherSlice";
import redeemCoupon from "../Services/RedeemCouponServices/RedeemCouponSlice";
import GetPromoSlice from "../Services/PromoLinkServices/PromoLinkSlice";
import GetRaceSlice from "../Services/GetRacesService/GetRaceSlice";
import GetReligionSlice from "../Services/GetReligionService/GetReligionSlice";
import UpdateProfileSlice from "../Services/UpdateProfileService/UpdateProfileSlice";
import UpdatePassSlice from "../Services/UpdatePasswordService/UpdatePassSlice";
import UpdateFamilySlice from "../Services/UpdateFamilyProfileService/UpdateFamilySlice";
import GetBakiSlice from "../Services/BakiEppService/GetBakiSlice";
import GetBannerSlice from "../Services/GetBannerService/GetBannerSlice";
import GetDiscountSlice from "../Services/GetDiscountService/GetDiscountSlice";
import GenerateOTPSlice from "../Services/GenerateOTPService/GenerateOTPSlice";
import GetUserProfileSlice from "../Services/UserProfileService/UserProfileSlice";
import GetFamilySlice from "../Services/GetFamilyProfileService/GetFamilySlice";
import CheckIcSlice from "../Services/CheckIcService/CheckIcSlice";
import CheckPhoneSlice from "../Services/CheckPhoneService/CheckPhoneSlice";
import CheckEmailSlice from "../Services/CheckEmailService/CheckEmailSlice";
import FeedBackSlice from "../Services/FeedbackService/FeedBackSlice";
import CampaignsSlice from '../Services/CampaignsService/CampaignsSlice'

export const store = configureStore({
  reducer: {
    login: LoginSlice,
    register: RegisterSlice,
    getCustomertype: GetCustomerTypeSlice,
    getCustomerProfile: CustomerProfileSlice,
    verifyOTP: VerifyOtpSlice,
    getOTP: GetOtpSlice,
    getNotifiation: GetNotifiationSlice,
    deviceLog: DeviceLogSlice,
    getPoints: GetPointsSlice,
    getSalesHistory: GetSalesHistorySlice,
    getVouchers: GetVouchersSlice,
    getCoupon: GetCouponSlice,
    NewLoginData: checkNewLoginId,
    RedeemVoucherData: redeemVoucher,
    RedeemCouponData: redeemCoupon,
    getPromo: GetPromoSlice,
    getRace: GetRaceSlice,
    getReligion: GetReligionSlice,
    updateProfile: UpdateProfileSlice,
    updatePass: UpdatePassSlice,
    updateFamily: UpdateFamilySlice,
    getBaki: GetBakiSlice,
    getBanner: GetBannerSlice,
    getDiscount: GetDiscountSlice,
    generateOTP: GenerateOTPSlice,
    getUserProfile: GetUserProfileSlice,
    getFamilyProfile: GetFamilySlice,
    checkIc: CheckIcSlice,
    checkPhone: CheckPhoneSlice,
    checkEmail: CheckEmailSlice,
    feedBack: FeedBackSlice,
    biometricLogin:LoginSlice,
    getCampaigns:CampaignsSlice,
    updateCampaigns:CampaignsSlice,
    getSubCampaigns:CampaignsSlice
  },
});
