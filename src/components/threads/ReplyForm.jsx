import clsx from 'clsx';
import TextArea from '../form/TextArea';
import RegularButton from '../buttons/RegularButton';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { sendComment } from '../../states/threadDetail/action';
import PropTypes from 'prop-types';

const replyFormInitialValues = {
  content: '',
};

const replyFormValidate = (values) => {
  const errors = {};

  if (!values.content) {
    errors.content = 'Content is required';
  }

  return errors;
};

function ReplyForm({ className }) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    replyFormInitialValues,
    replyFormValidate
  );

  const dispatch = useDispatch();

  const comment = () => {
    dispatch(sendComment(values));
  };

  return (
    <form className={clsx(className, 'mb-3')} onSubmit={handleSubmit(comment)}>
      <TextArea
        name="content"
        className="mb-3"
        rows={4}
        onChange={handleChange}
        value={values.content}
      />
      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content}</p>
      )}
      <RegularButton type={RegularButton.type.submit} title="Send" />
    </form>
  );
}

ReplyForm.propTypes = {
  className: PropTypes.string,
};

export default ReplyForm;
