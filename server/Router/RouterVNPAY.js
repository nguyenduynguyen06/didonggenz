const express = require('express');
const router = express.Router();
const sha256 = require('sha.js/sha256'); // Sử dụng sha256 từ sha.js
let $ = require('jquery');
const request = require('request');
const moment = require('moment');
const querystring = require('querystring');

function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();

    for (const key of keys) {
        sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, '+');
    }

    return sorted;
}

router.post('/create_payment_url', function (req, res, next) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');

    const ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    const vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;
    const orderId = moment(date).format('DDHHmmss');
    const amount = req.body.amount;
    const OrderInfo = req.body.orderinfo;
    const bankCode = req.body.bankCode;
    let locale = req.body.language;

    if (!locale || locale === 'undefined') {
        locale = 'vn';
    }
    const currCode = 'VND';

    const vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: OrderInfo + orderId,
        vnp_OrderType: 'other',
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };

    if (bankCode && bankCode !== 'undefined') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    const sortedParams = sortObject(vnp_Params);

    const signData = querystring.stringify(sortedParams, { encode: false });
    
    // Sử dụng sha256 để tạo mã hash thay vì crypto
    const hmac = new sha256(secretKey);
    hmac.update(signData);
    const signed = hmac.digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    const queryString = querystring.stringify(vnp_Params, { encode: false });
    const fullVnpUrl = `${vnpUrl}?${queryString}`;

    res.status(200).json({ data: fullVnpUrl });
});

router.get('/vnpay_return', function (req, res, next) {
    let vnp_Params = req.query;

    const secureHash = vnp_Params['vnp_SecureHash'];
    const secureHashType = vnp_Params['vnp_SecureHashType'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;

    const querystring = require('qs');
    const signData = querystring.stringify(vnp_Params, { encode: false });
    
    // Sử dụng sha256 để tạo mã hash thay vì crypto
    const hmac = new sha256(secretKey);
    hmac.update(signData);
    const signed = hmac.digest('hex');

    if (secureHash === signed && secureHashType === 'SHA256') {
        const vnp_ResponseCode = vnp_Params['vnp_ResponseCode'];
        const vnp_TransactionNo = vnp_Params['vnp_TransactionNo'];
        const vnp_OrderInfoEncoded = vnp_Params['vnp_OrderInfo'];
        const vnp_OrderInfoDecoded = decodeURIComponent(vnp_OrderInfoEncoded);
        const vnp_OrderInfoFormatted = vnp_OrderInfoDecoded.replace(/\+/g, ' ');
        const vnp_Amount = vnp_Params['vnp_Amount'];
        const vnp_BankCode = vnp_Params['vnp_BankCode'];
        const vnp_PayDate = vnp_Params['vnp_PayDate'];
        const formattedPayDate = moment(vnp_PayDate, 'YYYYMMDDHHmmss').format('DD/MM/YYYY HH:mm:ss');
        res.status(200).json({
            vnp_ResponseCode,
            vnp_TransactionNo,
            vnp_OrderInfoFormatted,
            vnp_Amount,
            vnp_BankCode,
            vnp_PayDate: formattedPayDate,
        });
    } else {
        res.status(200).json({ code: '97' });
    }
});

module.exports = router;
