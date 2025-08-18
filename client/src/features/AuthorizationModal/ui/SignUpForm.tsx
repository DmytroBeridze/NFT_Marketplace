import { IoMailOutline } from 'react-icons/io5';
import { GoKey } from 'react-icons/go';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { PiUser } from 'react-icons/pi';
import { GoUnlock } from 'react-icons/go';

import { FormikProvider, useFormik } from 'formik';

import { Button } from '../../../shared/ui/atoms/Button';
import { useTranslation } from 'react-i18next';
import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { usePasswordVisibility } from '../lib/usePasswordVisibility';
import { Text } from '../../../shared/ui/atoms/Text';
import { signupSchema } from '../config/signupSchema';

export const SignUpForm = () => {
  const { t } = useTranslation();
  const { passVisible, togglePasswordVisibility } = usePasswordVisibility();
  const formik = useFormik({
    initialValues: {
      userName: '',
      userMail: '',
      userPass: '',
      userconfirmPass: '',
      userType: '',
    },
    validationSchema: signupSchema,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className=" w-full flex  flex-col gap-6 items-center justify-between "
      >
        <FormikInput
          id="name"
          name="userName"
          type="text"
          className="w-full border-2 border-gray-300
          rounded-sm h-12 p-2.5 pl-14
          input-focus focus:ring-1 "
          placeholder={t('modal.placeholders.userName')}
          wrapperClass="w-full flex flex-col"
          leftIcon={<PiUser className=" text-gray-400" size={20} />}
          autoComplete="name"
        />
        <FormikInput
          id="email"
          name="userMail"
          type="email"
          className="w-full border-2 border-gray-300
          rounded-sm h-12 p-2.5 pl-14
          input-focus focus:ring-1 "
          placeholder={t('modal.placeholders.mail')}
          wrapperClass="w-full flex flex-col"
          leftIcon={<IoMailOutline className=" text-gray-400" size={20} />}
          autoComplete="email"
        />
        <FormikInput
          id="pass"
          name="userPass"
          type={`${passVisible.userPass ? 'text' : 'password'}`}
          className="w-full border-2 border-gray-300
          rounded-sm h-12 p-2.5 pl-14
          input-focus focus:ring-1"
          placeholder={t('modal.placeholders.password')}
          wrapperClass="w-full flex flex-col"
          leftIcon={<GoKey className=" text-gray-400" size={20} />}
          autoComplete="password"
          rightIcon={
            passVisible.userPass ? (
              <FaRegEyeSlash
                size={16}
                className="cursor-pointer text-gray-400"
              />
            ) : (
              <MdOutlineRemoveRedEye
                size={16}
                className="cursor-pointer text-gray-400"
              />
            )
          }
          onRightIconClick={() => togglePasswordVisibility('userPass')}
        />

        <FormikInput
          id="confirmPass"
          name="userconfirmPass"
          type={`${passVisible.userconfirmPass ? 'text' : 'password'}`}
          className="w-full border-2 border-gray-300
          rounded-sm h-12 p-2.5 pl-14
          input-focus focus:ring-1"
          placeholder={t('modal.placeholders.confirmPassword')}
          wrapperClass="w-full flex flex-col"
          leftIcon={<GoUnlock className=" text-gray-400" size={20} />}
          autoComplete="confirm password"
          rightIcon={
            passVisible.userconfirmPass ? (
              <FaRegEyeSlash
                size={16}
                className="cursor-pointer text-gray-400"
              />
            ) : (
              <MdOutlineRemoveRedEye
                size={16}
                className="cursor-pointer text-gray-400"
              />
            )
          }
          onRightIconClick={() => togglePasswordVisibility('userconfirmPass')}
        />

        <fieldset className="w-full flex justify-between items-center ">
          <FormikInput
            id="author"
            name="userType"
            type="radio"
            label={t('modal.labels.asAuthor')}
            value="author"
            className="h-4 w-4 cursor-pointer"
            wrapperClass="w-full flex gap-2"
            autoComplete="User Type"
            labelClass="-mt-[5px] text-gray-500 font-work-sans-regular"
          />
          <FormikInput
            id="client"
            name="userType"
            type="radio"
            label={t('modal.labels.asClient')}
            value="client"
            className="h-4 w-4 cursor-pointer "
            wrapperClass="w-full flex  gap-3 "
            autoComplete="User Type"
            labelClass="-mt-[5px] text-gray-500 font-work-sans-regular "
          />
        </fieldset>

        <Button
          type="submit"
          variant="primary"
          className="w-full p-3"
          radius="sm"
        >
          <Text
            color="static-text-white-color"
            size="t-text-sm"
            font="font-work-sans-regular"
          >
            {t('modal.button.JoinNow')}
          </Text>
        </Button>
      </form>
    </FormikProvider>
  );
};
