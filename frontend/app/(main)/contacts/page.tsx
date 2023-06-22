'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from 'components/Form'
import Form from 'components/Form/Form'
import Section from 'components/Section'
import { LINK_TO_GOOGLE_MAPS } from 'configs'
import { fetchServerSide } from 'lib/fetchServerSide'
import Link from 'next/link'
import s from './page.module.css'

interface FormProps {
  name: string
  email: string
  subject: string
  message: string
}

const ContactsPage = () => {
  const {
    reset,
    formState: { errors },
  } = useForm<FormProps>()

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await fetchServerSide({
      path: '/contacts',
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (response) {
      alert(JSON.stringify('Спасибо! Ваши данные успешно отправлены!'))
      reset()
    }
  }

  const rules = {
    required: 'The field is required',
    minLength: { value: 2, message: 'Please, enter more than 2 characters!' },
    pattern: { value: /[A-Za-z]+/, message: 'Field is invalid!' },
  }
  const rulesForEmail = {
    required: 'The field is required',
    pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: 'Е-mail is invalid!' },
  }

  const disabled = !!errors.name || !!errors.email || !!errors.message || !!errors.subject

  return (
    <Section title="Contacts">
      <div className={s.row}>
        <div className={s.contactsForm}>
          <Section title="Contacts form" />
          <Form<FormProps>
            onSubmit={onSubmit}
            btnText="Send"
            disabled={disabled}
            styleBtn={s.formBtn}
            config={{
              defaultValues: {
                name: '',
                email: '',
                subject: '',
                message: '',
              },
            }}
            fields={[
              {
                name: 'name',
                rules: rules,
                render: ({ field }) => <Input {...field} type="text" placeholder="Name" />,
              },
              {
                name: 'email',
                rules: rulesForEmail,
                render: ({ field }) => <Input {...field} type="text" placeholder="Email" />,
              },
              {
                name: 'subject',
                rules: rules,
                render: ({ field }) => <Input {...field} type="text" placeholder="Subject" />,
              },
              {
                name: 'message',
                rules: rules,
                render: ({ field }) => (
                  <textarea
                    className={s.formTextarea}
                    {...field}
                    placeholder="Type your message..."
                  ></textarea>
                ),
              },
            ]}
          />
        </div>
        <Section title="Info">
          <div className={s.contacts}>
            <p>
              It is a long fact that a reader will be distracted by the readable content of a page when
              looking at its layout.
            </p>

            <ul className={s.list}>
              <li>
                <Link href="tel:+18092345678">+1 809 234-56-78</Link>
              </li>
              <li>
                <Link href="mailto:support@gg.template">support@gg.template</Link>
              </li>
              <li>
                <Link href={LINK_TO_GOOGLE_MAPS}>221B Baker St, Marylebone, London</Link>
              </li>
            </ul>
          </div>
        </Section>
      </div>
    </Section>
  )
}

export default ContactsPage
