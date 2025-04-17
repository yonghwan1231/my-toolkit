export const formFieldConfig = {
  name: {
    placeholder: '영문 2자 이상',
    registerOptions: {
      pattern: {
        value: /^[a-zA-Z]{2,}$/,
        message: '이름 입력 형식이 잘못되었습니다.',
      },
    },
  },
  birth: {
    placeholder: '생년월일 8자리',
    registerOptions: {
      pattern: {
        value: /^\d{8}$/,
        message: '생년월일 입력 형식이 잘못되었습니다.',
      },
    },
  },
  email: {
    placeholder: 'sample@sample.co.kr',
    registerOptions: {
      pattern: {
        value:
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
        message: '이메일 입력 형식이 잘못되었습니다.',
      },
    },
  },
  phoneNumber: {
    placeholder: '010-0000-0000',
    registerOptions: {
      pattern: {
        value: /^([0-9]{3})-[0-9]{3,4}-[0-9]{4}$/,
        message: '휴대폰 번호 입력 형식이 잘못되었습니다.',
      },
    },
  },
  password: {
    placeholder: '영문, 숫자, 특수문자 포함 8자 이상',
    registerOptions: {
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        message:
          '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
      },
    },
  },

  password_confirm: {
    placeholder: '비밀번호를 다시 입력해주세요.',
    messages: {
      default: '비밀번호가 일치하지 않습니다.',
    },
    registerOptions: {
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        message:
          '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
      },
    },
  },
}
