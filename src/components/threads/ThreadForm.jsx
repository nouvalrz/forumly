import RegularButton from '../buttons/RegularButton';
import Input from '../form/Input';
import TextArea from '../form/TextArea';
import BaseCard from '../ui/BaseCard';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { handleAddThread } from '../../states/threads/action';
import { useNavigate } from 'react-router';

const threadFormInitialValues = {
  title: '',
  category: '',
  body: '',
};

const threadFormValidate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.body) {
    errors.body = 'Body is required';
  }

  return errors;
};

function ThreadForm() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    threadFormInitialValues,
    threadFormValidate
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = async () => {
    const result = await dispatch(handleAddThread(values));
    if (result) {
      navigate('/');
    }
  };

  return (
    <BaseCard className="flex flex-col gap-2">
      <h2 className="font-semibold text-gray-800 mb-5">Add Thread</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(post)}>
        <div>
          <Input
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={values.title}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">*{errors.title}</p>
          )}
        </div>

        <Input
          placeholder="Category"
          name="category"
          onChange={handleChange}
          value={values.category}
        />
        <div>
          <TextArea
            placeholder="Body"
            rows={6}
            name="body"
            onChange={handleChange}
            value={values.body}
          />
          {errors.body && (
            <p className="text-red-500 text-sm">*{errors.body}</p>
          )}
        </div>
        <RegularButton
          type={RegularButton.type.submit}
          title="Post"
          className="mt-5"
        />
      </form>
    </BaseCard>
  );
}

export default ThreadForm;
