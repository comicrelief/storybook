
export default {
  Questions: [
    {
      id: 'emailConsent',
      text: 'Email me',
      name: 'Email',
      customMessage: '',
      options: [
        {
          label: 'Email',
          value: 'yes',
          name: 'permissionEmail',
          hideFields: false,
          extraInfo: 'Please confirm the email address we will use to <b>email</b> you:',
        },
      ],
      field: [
        {
          id: 'emailAddress',
          type: 'email',
          name: 'email',
          label: 'Email address',
          placeholder: 'example@email.com',
          required: true,
        },
      ],
    },
    {
      id: 'postConsent',
      text: 'Send me post',
      name: 'Post',
      options: [
        {
          label: 'Post',
          value: 'yes',
          name: 'permissionPost',
          hideFields: false,
          extraInfo: 'Please confirm the address we will use to <b>post</b> to you:',
        },
      ],
      field: [
        {
          id: 'address1',
          type: 'text',
          name: 'address1',
          label: 'Address line 1',
          placeholder: null,
          required: true,
        },
        {
          id: 'address2',
          type: 'text',
          name: 'address2',
          label: 'Address line 2',
          placeholder: null,
          required: false,
          min: null,
        },
        {
          id: 'address3',
          type: 'text',
          name: 'address3',
          label: 'Address line 3',
          placeholder: null,
          required: false,
          min: null,
        },
        {
          id: 'town',
          type: 'text',
          name: 'town',
          label: 'Town/City',
          placeholder: null,
          required: true,
          pattern: '[a-zA-Z]+',
          min: null,
        },
        {
          id: 'postcode',
          type: 'text',
          name: 'postcode',
          label: 'Postcode',
          placeholder: 'SE1 7TP',
          required: true,
          pattern: '^[a-zA-Z]{1,2}\\d[a-zA-Z\\d]?\\s*\\d[a-zA-Z]{2}$',
        },
        {
          id: 'country',
          type: 'text',
          name: 'country',
          label: 'Country',
          placeholder: 'United Kingdom',
          required: true,
        },
      ],
    },
    {
      id: 'phoneConsent',
      text: 'Phone me',
      name: 'Phone',
      options: [
        {
          label: 'Phone',
          value: 'yes',
          name: 'permissionPhone',
          hideFields: false,
          extraInfo: 'Please confirm the telephone number we will use to <b>phone</b> you on:',
        },
      ],
      field: [
        {
          id: 'phoneNumber',
          type: 'tel',
          name: 'phone',
          label: 'Phone number',
          placeholder: null,
          required: true,
        },
      ],
    },
    {
      id: 'SMSConsent',
      text: 'Text me',
      name: 'Text',
      options: [
        {
          label: 'Text',
          value: 'yes',
          name: 'permissionSMS',
          hideFields: false,
          extraInfo: 'Please confirm the mobile number we will use to <b>text</b> you on:',

        },
      ],
      field: [
        {
          id: 'mobileNumber',
          type: 'tel',
          name: 'mobile',
          label: 'Mobile number',
          placeholder: null,
          required: true,
        },
      ],
    },
  ],
};
