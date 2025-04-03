import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { setError } from '../../redux/slices/notificationsSlice';

const FileDrop = ({ username, onFileSelect }) => {
  const [logo, setLogo] = useState([]);
  const dispatch = useDispatch();

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
  } = useDropzone({
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
    maxSize: 2 * 1024 * 1024,
    maxFiles: 2,
  });

  const fileErrors = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - Ошибка: {errors.map((e) => e.message).join(', ')}
    </li>
  ));

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setLogo(acceptedFiles.map((logo) => URL.createObjectURL(logo)));
      onFileSelect?.(acceptedFiles[0]);
    } else {
      onFileSelect?.(null);
    }
  }, [acceptedFiles, onFileSelect]);

  useEffect(() => {
    return () => acceptedFiles.forEach((file) => URL.revokeObjectURL(file));
  }, [acceptedFiles]);

  useEffect(() => {
    if (fileErrors.length > 0) {
      dispatch(setError(`Ошибка при загрузке файла`));
    }
  }, [dispatch, fileErrors.length]);

  return (
    <div className={'drop-container'}>
      <div
        className={`logo-file-drop ${
          isDragActive ? 'logo-file-drop_active' : ''
        }`}
      >
        {logo.length > 0 ? (
          <div className="form-preview__wrapper">
            <div className="form-preview__img">
              <img src={logo[0]} alt="Logo" />
              <span onClick={() => setLogo([])} className="overlay-delete">
                Изменить
              </span>
            </div>
            <span className="form-preview__username">{username}</span>
          </div>
        ) : (
          <div
            {...getRootProps()}
            style={{
              width: '100%',
            }}
          >
            <input {...getInputProps()} />
            <p>
              <img
                src={process.env.PUBLIC_URL + '/img/icon/drop-file.png'}
                alt="logo"
              />
              Загрузи своё лого <br /> <br />
              можешь просто перетащить
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDrop;
