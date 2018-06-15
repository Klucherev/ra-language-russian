module.exports = {
  ra: {
      action: {
          delete: 'Удалить',
          show: 'Просмотр',
          list: 'Список',
          save: 'Сохранить',
          create: 'Создать',
          edit: 'Редактировать',
          sort: 'Сортировать',
          cancel: 'Отмена',
          undo: 'Отменить',
          refresh: 'Обновить',
          add_filter: 'Добавить фильтр',
          remove_filter: 'Убрать фильтр',
          back: 'Назад',
          bulk_actions: '%{smart_count} выбрано',
          add: 'Добавить',
          remove: 'Удалить'
      },
      boolean: {
          true: 'Да',
          false: 'Нет',
      },
      page: {
          list: '%{name}',
          edit: '%{name} #%{id}',
          show: '%{name} #%{id}',
          create: 'Создать %{name}',
          delete: 'Удалить %{name} #%{id}',
          dashboard: 'Главная',
          not_found: 'Страница не найдена',
          loading: 'Загрузка'
      },
      input: {
          file: {
              upload_several: 'Перетащите файлы сюда или нажмите для выбора.',
              upload_single: 'Перетащите файл сюда или нажмите для выбора.',
          },
          image: {
              upload_several: 'Перетащите изображения сюда или нажмите для выбора.',
              upload_single: 'Перетащите изображение сюда или нажмите для выбора.',
          },
          references: {
              all_missing: 'Не удалось найти связанных данных',
              many_missing:
                  'Недоступна как минимум одна ссылка на данные',
              single_missing:
                  'Выбранная ссылка больше недоступна',
          }
      },
      message: {
          yes: 'Да',
          no: 'Нет',
          are_you_sure: 'Вы уверены?',
          about: 'Справка',
          not_found: 'Вы набрали неверный URL-адрес или перешли по некорректной ссылке',
          loading: 'Страница загружается',
          invalid_form: 'В форме обнаружены ошибки',
          delete_title: 'Удалить %{name} #%{id}',
          delete_content: 'Вы уверены, что хотите удалить?',
          bulk_delete_title:
              'Удалить %{name} |||| Удалить %{smart_count} %{name}',
          bulk_delete_content:
              'Вы уверены, что хотите удалить %{name}? |||| Вы уверены, что хотите удалить %{smart_count} %{name}?',
      },
      navigation: {
          no_results: 'Результатов не найдено',
          page_out_of_boundaries: 'Страница %{page} вне границ',
          page_out_from_end: 'Невозможно переместиться дальше последней страницы',
          page_out_from_begin: 'Номер страницы не может быть меньше 1',
          page_range_info: '%{offsetBegin}-%{offsetEnd} из %{total}',
          next: 'Следующая',
          prev: 'Предыдущая',
      },
      auth: {
          username: 'Имя пользователя',
          password: 'Пароль',
          sign_in: 'Войти',
          sign_in_error: 'Ошибка аутентификации, попробуйте снова',
          logout: 'Выйти',
      },
      notification: {
          updated: 'Элемент обновлен',
          created: 'Элемент создан',
          deleted: 'Элемент удален',
          bad_item: 'Проблемы с элементом',
          item_doesnt_exist: 'Элемент не существует',
          http_error: 'Ошибка сервера',
          canceled: 'Операция отменена',
      },
      validation: {
          required: 'Обязательно для заполнения',
          minLength: 'Минимальное кол-во символов %{min}',
          maxLength: 'Максимальное кол-во символов %{max}',
          minValue: 'Минимальное значение %{min}',
          maxValue: 'Значение может быть %{max} или меньше',
          number: 'Должно быть цифрой',
          email: 'Некорректный email',
          oneOf: 'Должно быть одно из: %{options}',
          regex: 'Должно соответствовать формату (regexp): %{pattern}',
      },
  },
};