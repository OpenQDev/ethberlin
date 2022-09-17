import { setAlert } from '../store/alert/alert.actions';
import { shapeV2Data, userPinList } from '../store/data/data.actions';
import { api, managedApi } from '../services/api';
import {
    REGION_PERMISSIONS_RECEIVED,
    TRAVERSE_FOLDER,
    USER_PIN_LIST_RETRIEVED,
    PIN_CONTENT_PREVIEW_UPDATED
} from './types';
import { getErrorMessage } from 'helpers/error.helper';
import {AxiosRequestConfig} from "axios";

const getLabel = (submarine: boolean, label: string) => {
    if (label === 'metadata') {
        return submarine ? 'metadata' : 'pinataMetadata';
    } else if (label === 'options') {
        return submarine ? 'options' : 'pinataOptions';
    } else if (label === 'file') {
        return submarine ? 'files' : 'file';
    } else {
        return ''
    }
};

const handleV2Upload = (selectedFiles: any, customName: any, wrapWithDirectory: boolean, submarine: boolean) => {
    const data = new FormData();
    if (customName && customName !== '') {
        data.append('name', customName);
    }

    data.append('cidVersion', '1');

    Array.from(selectedFiles).forEach((file: any) => {
        data.append(getLabel(true, 'file'), file);
    });

    if (wrapWithDirectory === true) {
        data.append('wrapWithDirectory', 'true');
    } else {
        data.append('wrapWithDirectory', 'false');
    }

    data.append('pinToIPFS', submarine ? 'false' : 'true');

    return data;
};

const handleV1Upload = (selectedFiles: any, customName: any, wrapWithDirectory: boolean) => {
    const data = new FormData();
    if (customName && customName !== '') {
        const metadata = JSON.stringify({
            name: customName
        });
        data.append(getLabel(false, 'metadata'), metadata);
    }

    if (selectedFiles.length > 0) {
        Array.from(selectedFiles).forEach((file: any) => {
            data.append(getLabel(false, 'file'), file);
        });
    } else {
        data.append(getLabel(false, 'file'), selectedFiles[0], selectedFiles[0].name);
    }

    if (wrapWithDirectory === true) {
        const pinataOptions = JSON.stringify({
            wrapWithDirectory: true
        });
        data.append(getLabel(false, 'options'), pinataOptions);
    }

    return data;
};

const uploadPin = async (selectedFiles: any, customName: string, wrapWithDirectory: boolean, submarine: boolean, progressCallback: (props: any) => any) => {
    let data, response, uploadedItem;
    const config: AxiosRequestConfig = {
        onUploadProgress: progressCallback
    };
    if (submarine) {
        data = handleV2Upload(selectedFiles, customName, wrapWithDirectory, submarine);
        response = await managedApi.post('content', data, config);
        uploadedItem = response?.data?.items[0];
    } else {
        data = handleV1Upload(selectedFiles, customName, wrapWithDirectory);
        response = await api.post('pinning/pinFileToIPFS', data, config);
        uploadedItem = response?.data;
    }
    return uploadedItem;
};

export const handleUpload =
    (selectedFiles: any, customName: string, wrapWithDirectory: boolean, progressCallback: (props: any) => any, submarine: boolean) => async (dispatch: any) => {
        try {
            const uploadedItem = await uploadPin(
                selectedFiles,
                customName,
                wrapWithDirectory,
                submarine,
                progressCallback
            );

            if (uploadedItem) {
                if (!uploadedItem?.isDuplicate) {
                    dispatch(setAlert('File Successfully uploaded!', 'success'));
                } else {
                    // throw custom error for duplicated file
                    throw new Error(
                        `This file (${uploadedItem?.[submarine ? 'cid' : 'IpfsHash']}) has already been uploaded`
                    );
                }
            }
            dispatch(userPinList({ status: 'pinned' }));
        } catch (error) {
            const message = getErrorMessage(error);
            dispatch(setAlert(message, 'error'));
        }
    };

const handleV2ContentUpdates = async (pinId: string, name: string, keyvalues: any) => {
    //  Since we currently have two paths (V1 and V2) and on V2 name updates happen separately from metadata updates, this function is just always going to make a PUT request to both the content/id and content/id/metadata endpoints
    //  When we have unified everything, we will rewrite the UI to handle this properly.
    await managedApi.put(`content/${pinId}/metadata`, {
        keyvalues
    });
    await managedApi.put(`content/${pinId}`, { name });
};

export const putHashMetadata =
    (hash: any, { name, keyvalues }: any, submitTableFilters: any, pinId: any) =>
    async (dispatch: any) => {
        try {
            if (pinId) {
                await handleV2ContentUpdates(pinId, name, keyvalues);
            } else {
                const data = {
                    ipfsPinHash: hash,
                    name,
                    keyvalues
                };

                await api.put(`pinning/hashMetadata`, data);
            }

            submitTableFilters();
            dispatch(setAlert('Updated!', 'success'));
            return true;
        } catch (error) {
            console.log(error);
        }
    };

export const removePin = (ipfsHash: string, submitTableFilters: any, contentId: string) => async (dispatch: any) => {
    try {
        if (contentId) {
            await managedApi.delete(`content/${contentId}`);
        } else {
            await api.delete(`pinning/unpin/${ipfsHash}`);
        }
        submitTableFilters();
        dispatch(setAlert('Pin removed', 'success'));
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const regionPermissions = () => async (dispatch: any) => {
    try {
        const response = await api.get(`pinning/regionPermissions`);
        dispatch({ type: REGION_PERMISSIONS_RECEIVED, payload: response.data });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const changeHashPinPolicy = (ipfsPinHash: string, newPinPolicy: any) => async (dispatch: any) => {
    try {
        const data = {
            newPinPolicy: newPinPolicy,
            ipfsPinHash: ipfsPinHash
        };
        await api.put(`pinning/hashPinPolicy`, data);

        dispatch(userPinList({ status: 'pinned' }));
        dispatch(setAlert('New Pin Policy Set!', 'success'));
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const userPinPolicy = (newPinPolicy: any, migratePreviousPins: boolean) => async (dispatch: any) => {
    try {
        const data = {
            newPinPolicy: newPinPolicy,
            migratePreviousPins: migratePreviousPins || false
        };
        await api.put(`pinning/userPinPolicy`, data);

        dispatch(regionPermissions());
        dispatch(setAlert('New Pin Policy Set!', 'success'));
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const pinHash = (hashToPin: any, customName: string) => async (dispatch: any) => {
    try {
        const data = {
            hashToPin: hashToPin,
            pinataMetadata: {}
        };
        if (customName && customName !== '') {
            data.pinataMetadata = {
                name: customName
            };
        }

        await api.post(`pinning/pinByHash`, data);

        dispatch(setAlert('CID Successfully added to the pinning queue!', 'success'));
        dispatch(userPinList({ status: 'pinned' }));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const generateAccessToken = (timeoutSeconds: number, id: string) => async (dispatch: any) => {
    try {
        const body = {
            timeoutSeconds,
            contentIds: [id]
        };
        const res = await managedApi.post('auth/content/jwt', body);
        return res.data;
    } catch (error) {
        dispatch(setAlert('Trouble generating access token', 'error'));
    }
};

export const listFolderContents =
    (file: any, offset: number, limit = 10) =>
    async (dispatch: any) => {
        try {
            const url = `content/${file.id}/list?offset=${offset}&limit=${limit}`;
            const res = await managedApi.get(url);
            let files = [];
            for (const item of res.data.items) {
                files.push(shapeV2Data(item));
            }
            dispatch({
                type: TRAVERSE_FOLDER,
                payload: file
            });
            dispatch({
                type: USER_PIN_LIST_RETRIEVED,
                payload: { count: res.data.totalItems, rows: files }
            });
        } catch (error) {
            console.log(error);
            const message = getErrorMessage(error);
            dispatch(setAlert(message, 'error'));
        }
    };

export const makeSubmarinedFilePublic = (file: any) => async (dispatch: any) => {
    try {
        const url = `content/${file.id}`;
        const body = {
            name: file.name,
            pinToIPFS: 'true'
        };
        await managedApi.put(url, body);
        dispatch(userPinList({ status: 'pinned' }));
        return true;
    } catch (error) {
        console.log(error);
        const message = getErrorMessage(error);
        dispatch(setAlert(message, 'error'));
    }
};

export const setPinContentPreviewOptions = (config: any) => async (dispatch: any, getState: any) => {
    const { fileId, thumbnail, description, title } = config;
    try {
        const url = `v2/pins/${fileId}/preview`;
        const data = new FormData();
        data.append('file', thumbnail[0]);
        data.append('title', title);
        data.append('description', description);
        const result = await api.post(url, data);
        if (result?.data) {
            // merge preview data with activePin object, and set updated list to the store
            const oldState = await getState().data.userPinList.rows;
            const updatedPinsList = oldState.map((el: any) => {
                if (el.id === result.data.pin_id) {
                    el = {
                        ...el,
                        previewOptions: {
                            title: result.data.title,
                            description: result.data.description,
                            thumbnail: result.data.preview_url
                        }
                    };
                }
                return el;
            });
            dispatch(setAlert('Content Preview Successfully updated!', 'success'));
            dispatch({
                type: PIN_CONTENT_PREVIEW_UPDATED,
                payload: updatedPinsList
            });
        }
    } catch (error) {
        const message = getErrorMessage(error);
        dispatch(setAlert(message, 'error'));
        throw error;
    }
};

export const removePinContentPreviewOptions = (fileId: any) => async (dispatch: any) => {
    try {
        const url = `v2/pins/${fileId}/preview`;
        await api.delete(url);
        dispatch(setAlert('Content Preview Successfully deleted!', 'success'));
    } catch (error) {
        let message = getErrorMessage(error);
        if (message.response.status === 404) {
            message = 'File does not have a preview set for it.';
        }
        dispatch(setAlert(message, 'error'));
    }
};
