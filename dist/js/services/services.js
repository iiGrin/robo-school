// функция отправки запроса на сервер 
const postData = async (url, data) => { 
    const res = await fetch(url, { // async/await - функция продолжит работу после выполнения данного блока
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

// функция получения данных с сервера
const getResource = async (url) => {
    const result = await fetch(url);
    if (!result.ok) { // ошибка получения данных
        throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
    }

    return await result.json(); 
}

export {postData, getResource};