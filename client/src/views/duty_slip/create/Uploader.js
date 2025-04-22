import React from 'react';
import { Upload, Button } from 'components/ui';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { FcImageFile } from 'react-icons/fc';
import { useSelector } from 'react-redux';

const Uploader = () => {
    const maxUpload = 1;

    const beforeUpload = (file, fileList) => {
        let valid = true;

        const allowedFileType = ['image/jpeg', 'image/png'];
        const maxFileSize = 500000;

        if (fileList.length >= maxUpload) {
            return `You can only upload ${maxUpload} file(s)`;
        }

        for (let f of file) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg or .png file!';
            }

            if (f.size >= maxFileSize) {
                valid = 'Upload image cannot more then 500kb!';
            }
        }

        return valid;
    };

    const currentPage = useSelector(
        (state) => state.createDutySlip.data.currentPage
    );
    const isDisabled = currentPage === 'view' ? true : false;
    if (isDisabled) {
        return null;
    }
    return (
        <div className="mt-4">
            <div>
                <Upload
                    draggable
                    beforeUpload={beforeUpload}
                    uploadLimit={maxUpload}
                    onChange={(file, fileList) => console.log(file, fileList)}
                >
                    <div className="my-16 text-center">
                        <div className="text-6xl mb-4 flex justify-center">
                            <FcImageFile />
                        </div>
                        <p className="font-semibold">
                            <span className="text-gray-800 dark:text-white">
                                Drop your image here, or{' '}
                            </span>
                            <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 opacity-60 dark:text-white">
                            Support: jpeg, png
                        </p>
                    </div>
                </Upload>
            </div>
        </div>
    );
};

export default Uploader;
