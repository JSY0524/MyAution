const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const APP_NAME = '한동 경매';

// //인증이메일
// exports.authEmail = functions.database
// .ref('/posts')
// .onCreate(event => {
//     var mailOptions = {
//         from: `${APP_NAME} <hdaution@gmail.com>`,
//         to: '21300786@handong.edu',
//         subject: `Welcome to ${APP_NAME}!`,
//         text: `Hey! Welcome to ${APP_NAME}. I hope you will enjoy our service.`
//     };
//     return mailTransport.sendMail(mailOptions).then(() => {
//         console.log('New welcome email sent to 21300786@handong.edu');
//     });
// });

//입찰한 물건에 새로운 입찰자
exports.newBidEmail = functions.database
.ref('/posts/{postId}/log/')
.onUpdate(event => {
    var email = event.data.previous.val().email;

    event.data.adminRef.parent.child('title').once("value").then(snap =>{
        var name = snap.val();

        var mailOptions = {
            from: `${APP_NAME} <hdaution@gmail.com>`,
            to: email,
            subject: `new bid to ${name}!`,
            text: ` 새로운 입찰자가 등장하였습니다.
            다시 입찰해 보세요!
                        -from ${APP_NAME}.`
        };
        
        return mailTransport.sendMail(mailOptions).then(() => {
            console.log(`New bid email sent to ${email}`);
        });
    });
    
});

//날짜에 따라 status 변화
exports.statusUpdate = functions.https.onRequest((req, res) => {
    const currentTime = new Date().toISOString().slice(0,10);
    const ref = admin.database().ref();

    ref.child('posts').orderByChild('endDate').startAt(currentTime).once('value')
    .then(snap => {
        snap.forEach( childsnap=>{
            childsnap.ref.child('status').set('On');
        })
    })
    ref.child('posts').orderByChild('endDate').endAt(currentTime).once('value')
    .then(snap => {
        snap.forEach( childsnap=>{
            childsnap.ref.child('status').set('Off');
            const uid = childsnap.child('log').val().biduid;
            admin.database().ref(`/userProfile/${uid}/mywinning/${childsnap.key}`).set("true");
        })
    }).then(()=>{
        res.send('status updated!!')
    }).catch(error =>{
        res.send(error);
    })

})

//낙찰 알림
exports.winEmail = functions.database
.ref('/posts/{postId}/status')
.onUpdate(event => {
    const status = event.data.val();
    if(status!='end'){
        return;
    }
    const postId = event.params.postId;

    event.data.adminRef.parent.child('log').once("value").then(snap =>{
        var email=snap.val().email;
        console.log(email);
        
        event.data.adminRef.parent.child('title').once("value").then(snap =>{
            var name = snap.val();
            console.log(name);

            var mailOptions = {
                from: `${APP_NAME} <hdaution@gmail.com>`,
                to: email,
                subject: `win to ${name}!`,
                text: `축하드립니다!!
                낙찰되었습니다. 판매자를 확인해주세요.
                                -from ${APP_NAME}.`
            };
            return mailTransport.sendMail(mailOptions).then(() => {
                console.log(`New winning email sent to ${email}`);
            });
        });
    })
    

    
});

// //댓글 달렸을 떄
// exports.commentEmail = functions.database
// .ref('/posts/{postId}/reply')
// .onCreate(event => {

//     const postId = event.params.postId;
//     var email ='';
//     var name = '';
//     event.data.adminRef.parent.child('log').once("value").then(snap =>{
//         email=snap.val().emil;
//     })
//     event.data.adminRef.parent.child('title').once("value", snap =>{
//         name = snap.val();
//     });



//     var mailOptions = {
//         from: `${APP_NAME} <hdaution@gmail.com>`,
//         to: '21300786@handong.edu',
//         subject: `Welcome to ${APP_NAME}!`,
//         text: `Hey! Welcome to ${APP_NAME}. I hope you will enjoy our service.`
//     };
//     return mailTransport.sendMail(mailOptions).then(() => {
//         console.log('New welcome email sent to 21300786@handong.edu');
//     });
// });