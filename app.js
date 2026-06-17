// Ждем полной загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    
    // Элементы переключения вкладок
    const tabSuggest = document.getElementById('tabSuggest');
    const tabAdmin = document.getElementById('tabAdmin');
    const suggestSection = document.getElementById('suggestSection');
    const adminSection = document.getElementById('adminSection');

    // Элементы формы
    const trackSource = document.getElementById('trackSource');
    const sourceUrlGroup = document.getElementById('sourceUrlGroup');
    const dropArea = document.getElementById('dropArea');
    const audioFile = document.getElementById('audioFile');

    // --- ЛОГИКА ВКЛАДОК ---
    tabSuggest.addEventListener('click', () => {
        tabSuggest.classList.add('active');
        tabAdmin.classList.remove('active');
        suggestSection.style.display = 'block';
        adminSection.style.display = 'none';
    });

    tabAdmin.addEventListener('click', () => {
        tabAdmin.classList.add('active');
        tabSuggest.classList.remove('active');
        adminSection.style.display = 'block';
        suggestSection.style.display = 'none';
        
        // Тут в будущем будет вызов функции загрузки треков из базы
        loadPendingTracks();
    });

    // --- ДИНАМИЧЕСКИЕ ПОЛЯ ФОРМЫ ---
    // Меняем поля в зависимости от того, откуда трек (файл или ссылка)
    trackSource.addEventListener('change', (e) => {
        const source = e.target.value;
        
        if (source === 'file') {
            sourceUrlGroup.style.display = 'none';
            document.getElementById('trackUrl').removeAttribute('required');
            
            dropArea.style.display = 'flex';
            audioFile.setAttribute('required', 'required');
        } else {
            // Если выбран YouTube, Яндекс или Spotify — показываем поле для ссылки
            sourceUrlGroup.style.display = 'block';
            document.getElementById('trackUrl').setAttribute('required', 'required');
            
            // И прячем поле загрузки файла
            dropArea.style.display = 'none';
            audioFile.removeAttribute('required');
            audioFile.value = ''; // Сбрасываем выбранный файл, если он был
            document.querySelector('.file-msg').innerText = 'или перетащи его сюда';
        }
    });

    // Красивое отображение имени выбранного файла
    audioFile.addEventListener('change', (e) => {
        const fileMsg = document.querySelector('.file-msg');
        if (e.target.files.length > 0) {
            fileMsg.innerText = `Выбран файл: ${e.target.files[0].name}`;
        } else {
            fileMsg.innerText = 'или перетащи его сюда';
        }
    });

    // --- ДЕМО-ФУНКЦИЯ ДЛЯ АДМИНКИ ---
    function loadPendingTracks() {
        const listContainer = document.getElementById('pendingTracksList');
        // Временная заглушка, пока мы не подключили базу данных
        listContainer.innerHTML = `
            <div class="track-item">
                <div class="track-info">
                    <h3>Локоны</h3>
                    <p>Артист: Скриптонит | Источник: YouTube</p>
                </div>
                <div class="track-actions">
                    <button class="btn-approve">✓</button>
                    <button class="btn-reject">✕</button>
                </div>
            </div>
            <div class="track-item">
                <div class="track-info">
                    <h3>Кадилак</h3>
                    <p>Артист: Моргенштерн | Источник: Файл MP3</p>
                </div>
                <div class="track-actions">
                    <button class="btn-approve">✓</button>
                    <button class="btn-reject">✕</button>
                </div>
            </div>
        `;
    }

    // Обработка отправки формы
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusMessage = document.getElementById('statusMessage');
        
        statusMessage.style.color = '#45f3ff';
        statusMessage.innerText = 'Успешно отправлено на модерацию Quach!';
        
        // Сбрасываем форму
        uploadForm.reset();
        if (trackSource.value !== 'file') {
            dropArea.style.display = 'none';
        } else {
            sourceUrlGroup.style.display = 'none';
        }
    });
});