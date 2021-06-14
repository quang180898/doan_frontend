import { Upload } from 'antd';
import { ModalCustom } from 'components/base/Modal';
import CardWrap from 'components/common/Card/CardWarp';
import { ImageCropper } from 'components/common/Images';
import { b64toBlob, canvasToBinary, dataURLtoFile, showNotification } from 'functions/Utils';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_AVATAR_URL } from 'contant';
import { accountAction } from 'store/action';
import { useParams } from 'react-router';


const Avatar = ({ data, setDataImage }) => {

    const dispatch = useDispatch()

    const {accountId} = useParams();

    const [visibleModal, setVisibleModal] = useState(false)
    const [cropperData, setCropperData] = useState();
    
    const [imgTest, setImgTest] = useState()
    const [state, setState] = useState({
        imgCurent: null,
        imgOld: data,
        imgNew: null,
        fileUpload: null,
        openCrop: false,
    })

    const store = useSelector(state => state.accountReducer) 
    const { postUpdateResponse } = store

    // data props 
    useEffect(() => {
        if (data) {
            console.log(data)
            setState({ ...state, imgOld: data.image_bytes, imgCurent: data.image_bytes })
        }
    }, [data])

    // response update avatar success 

    useEffect(() => {
        if (postUpdateResponse) {
            if (postUpdateResponse.success) {
                setState({ ...state, imgOld: postUpdateResponse.detail.customer_image_base64 })
                showNotification.success({ message: 'update_success', title: 'success' })
                setTimeout(() => {
                    setVisibleModal(false)
                }, 1000);
            } else {
                showNotification.error({ message: postUpdateResponse.detail, title: 'error' })
            }
        }
    }, [postUpdateResponse])

    const changeAvatar = () => {
        setVisibleModal(true)
    }

    const selectImageUpload = (e) => {
        if (e && e.file) {
            // open crop container 
            setState({ ...state, openCrop: true })

            let file = Math.round((e.file.size / 1024));
            // The size of the file.

            if (!e.file.type.match(/^image\//)) {
                showNotification.error({ message: 'setting_error_type_invalid', title: 'error' })
                setState({
                    ...state,
                    imgNew: null,
                    fileUpload: null,
                    openCrop: false,
                })

            }
            else if (file >= 4096) {
                showNotification.error({ message: 'setting_error_file_big', title: 'error' })
                setState({
                    ...state,
                    imgNew: null,
                    fileUpload: null,
                    openCrop: false,
                })
            } else {
                setState({ ...state, fileUpload: e.file, openCrop: true })
            }
        }
    }


    // click crop accept
    const onAcceptCrop = () => {

        if (cropperData) {
            cropperData.crop();
            let canvasData = cropperData.getCroppedCanvas({
                maxWidth: 500,
                maxHeight: 300,
            })
            let temp = canvasToBinary(canvasData);
            let ImageURL = canvasData.toDataURL();
            let blob = b64toBlob(ImageURL)
            let file = dataURLtoFile(ImageURL, Date.now() + "nameAvatar.png")
            setState({
                ...state,
                imgCurent: blob,
                openCrop: false
            })
            setImgTest(file)
        }
    }

    //click crop reset
    const onResetCrop = () => {
        setState({
            ...state,
            imgNew: null,
            fileUpload: null,
            openCrop: false,
        })
    }

    // push server 
    const onSaveImageDone = () => {
        dispatch(accountAction.updateInfoProfile({user_id: parseInt(accountId),image: imgTest, image_name: imgTest.name }))
        setState({
            ...state,
            openCrop: false,
            imgOld: null
        })
    }

    // close modal 
    const onCancel = () => {
        console.log('onCancel modal');
        setVisibleModal(false)
        setState({
            ...state,
            imgNew: null,
            fileUpload: null,
            openCrop: false,
        })
    }


    return (
        <CardWrap title="Avatar">
            {//has avatar
                state.imgOld ?
                    <div id="div_image_preview">
                        <img className="img-thumbnail user_avatar" src={`data:image/jpeg;base64,${state.imgOld}`}/>
                        <small className="mt-2 mb-1 fs-13">
                            <u onClick={changeAvatar} className="cursor-pointer fw-medium uni_text_6d30ab change_avatar_profile">setting_change_avatar</u>
                        </small>
                    </div>
                    :
                    <div className="m_drag-images cursor-pointer" onClick={changeAvatar}>
                        <p className="text change_avatar_profile">
                            <i class="fas fa-images"></i>
                            <span>Cập nhật ảnh đại diện</span>
                        </p>
                    </div>
            }


            <ModalCustom widthModal="800px" classModal="modal-update-avatar" visible={visibleModal} title='Avatar'>
                <div class="row">
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        {
                            !state.openCrop ?
                                <div class="first" style={{ border: '1px solid #ccc', height: '100%' }}>
                                    <img class="first_img" src={state.imgCurent}/>
                                </div>
                                : <>
                                    <ImageCropper setCropperData={setCropperData} state={state} />
                                    <div className="actions-user-avatar mt-3">
                                        <button className="btn btn-uni-purple" onClick={onAcceptCrop} type="button">Cắt</button>
                                        <button className="btn btn-uni-cancel ml-2" onClick={onResetCrop} type="button">Đặt</button>
                                    </div>
                                </>
                        }
                    </div>


                    <div class="col-lg-7 col-md-7 col-sm-7">
                        <Upload
                            onChange={(e) => selectImageUpload(e)}
                            showUploadList={false}
                            customRequest={() => { }}
                        >
                            <label class="btn square wrap_upload mb-0" for="fileInput">
                                <i class="icon la la-image fs-14 pr-2"></i>Chọn hình ảnh
                            </label>
                        </Upload>
                        <strong className="black mt-2 d-block">Ghi chú</strong>
                        <ul>
                            <li>Kích cỡ hình ảnh 128 x 128 pixels. Kích thước tệp cần phải được điều chỉnh cho phù hợp.</li>
                            <li>Bao gồm định dạng ảnh: <b>png, jpg, jpeg …</b></li>
                        </ul>
                        <div class="d-flex mt-2 justify-content-end">
                            <button class="btn-uni-cancel cancel_image mr-3" onClick={onCancel} >Huỷ bỏ </button>
                            <button
                                class="btn btn-save btn-uni-purple save_image"
                                style={{ width: 150 }}
                                onClick={onSaveImageDone}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </ModalCustom>
        </CardWrap>
    )
}

export default Avatar;
