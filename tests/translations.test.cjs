const test = require('node:test');
const assert = require('node:assert/strict');
const englishKeys = require('./fixtures/english-keys-v5.15.4.json');
const russianMessages = require('../dist/cjs/index.js').default;

// Эталонный список ключей зафиксирован по ra-language-english v5.15.4.
// При переходе на новую версию React-admin обновляем этот файл отдельно.
function flattenKeys(dictionary, prefix = '') {
    return Object.entries(dictionary).flatMap(([name, value]) => {
        const path = prefix ? prefix + '.' + name : name;
        return typeof value === 'string' ? [path] : flattenKeys(value, path);
    });
}

function getTranslation(key) {
    const value = key.split('.').reduce((current, part) => current?.[part], russianMessages);
    assert.equal(typeof value, 'string', 'Нет строки перевода: ' + key);
    return value;
}

function interpolate(translation, options) {
    return translation.replace(/%\{([^}]+)\}/g, (_, name) => {
        assert.ok(
            Object.hasOwn(options, name),
            'Не передано значение для %{' + name + '} в строке: ' + translation
        );
        return String(options[name]);
    });
}

// Для целых неотрицательных чисел такой же порядок форм использует node-polyglot 2.x:
// 0 — один, 1 — несколько, 2 — много (one / few / many).
const pluralRules = new Intl.PluralRules('ru');
const formIndices = { one: 0, few: 1, many: 2 };
const counts = [
    [0, 2],
    [1, 0],
    [2, 1],
    [5, 2],
    [11, 2],
    [21, 0],
    [22, 1],
    [25, 2],
];

const pluralMessages = {
    'ra.action.bulk_actions': [
        'Выбран %{smart_count} элемент',
        'Выбрано %{smart_count} элемента',
        'Выбрано %{smart_count} элементов',
    ],
    'ra.message.bulk_delete_content': [
        'Вы уверены, что хотите удалить %{smart_count} запись?',
        'Вы уверены, что хотите удалить %{smart_count} записи?',
        'Вы уверены, что хотите удалить %{smart_count} записей?',
    ],
    'ra.message.bulk_delete_title': [
        'Удалить %{smart_count} запись',
        'Удалить %{smart_count} записи',
        'Удалить %{smart_count} записей',
    ],
    'ra.message.bulk_update_content': [
        'Вы уверены, что хотите обновить %{smart_count} запись?',
        'Вы уверены, что хотите обновить %{smart_count} записи?',
        'Вы уверены, что хотите обновить %{smart_count} записей?',
    ],
    'ra.message.bulk_update_title': [
        'Обновить %{smart_count} запись',
        'Обновить %{smart_count} записи',
        'Обновить %{smart_count} записей',
    ],
    'ra.notification.updated': [
        'Обновлена %{smart_count} запись',
        'Обновлены %{smart_count} записи',
        'Обновлено %{smart_count} записей',
    ],
    'ra.notification.deleted': [
        'Удалена %{smart_count} запись',
        'Удалены %{smart_count} записи',
        'Удалено %{smart_count} записей',
    ],
};

test('в русском словаре есть все ключи английского словаря v5.15.4', () => {
    const russianKeys = new Set(flattenKeys(russianMessages));
    const missing = englishKeys.filter(key => !russianKeys.has(key));
    assert.deepEqual(missing, []);
});

test('все сообщения с множественными формами содержат три варианта', () => {
    const pluralKeys = flattenKeys(russianMessages).filter(key => getTranslation(key).includes('||||'));
    assert.deepEqual(pluralKeys.sort(), Object.keys(pluralMessages).sort());

    for (const key of pluralKeys) {
        assert.equal(getTranslation(key).split('||||').length, 3, key);
    }
});

for (const [key, expectedForms] of Object.entries(pluralMessages)) {
    test(key + ': склонение и количество записей', () => {
        const actualForms = getTranslation(key).split('||||').map(value => value.trim());
        assert.deepEqual(actualForms, expectedForms);

        for (const [count, expectedIndex] of counts) {
            assert.equal(formIndices[pluralRules.select(count)], expectedIndex, 'Число: ' + count);
            const result = interpolate(actualForms[expectedIndex], { smart_count: count });
            const expected = interpolate(expectedForms[expectedIndex], { smart_count: count });
            assert.equal(result, expected, 'Число: ' + count);
            assert.ok(result.includes(String(count)), 'Потеряно количество: ' + count);
            assert.doesNotMatch(result, /%\{[^}]+\}/, 'Не подставлен параметр');
        }
    });
}

test('обычные плейсхолдеры подставляются без изменений', () => {
    assert.equal(
        interpolate(getTranslation('ra.message.delete_title'), {
            name: 'Товар',
            recordRepresentation: 'Чайник',
        }),
        'Удалить Товар "Чайник"'
    );
    assert.equal(
        interpolate(getTranslation('ra.sort.sort_by'), {
            field: 'Дата создания',
            field_lower_first: 'дата создания',
            order: 'убывания',
        }),
        'Сортировать в порядке убывания по полю "Дата создания"'
    );
});
