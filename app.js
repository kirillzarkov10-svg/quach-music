// Логика интерфейса Quach Music
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
    const uploadForm = document.getElementById('uploadForm');
    const statusMessage = document.getElementById('statusMessage');

    // --- ЛОГИКА ВКЛАДОК ---
    tabSuggest.addEventListener('click', () => {
        tabSuggest.classList.add('active');
        tabAdmin.classList.remove('active');
        suggestSection.style.display = 'block';
        adminSection.style.display = 'none';
        statusMessage.innerText = ''; 
    });

    tabAdmin.addEventListener('click', () => {
        tabAdmin.classList.add('active');
        tabSuggest.classList.remove('active');
        adminSection.style.display = 'block';
        suggestSection.style.display = 'none';
        statusMessage.innerText = '';
        
        loadPendingTracks();
    });

    // --- ДИНАМИЧЕСКИЕ ПОЛЯ ФОРМЫ ---
    trackSource.addEventListener('change', (e) => {
        const source = e.target.value;
        const trackUrlInput = document.getElementById('trackUrl');
        
        if (source === 'file') {
            sourceUrlGroup.style.display = 'none';
            trackUrlInput.removeAttribute('required');
            trackUrlInput.value = '';
            
            dropArea.style.display = 'flex';
            audioFile.setAttribute('required', 'required');
        } else {
            sourceUrlGroup.style.display = 'block';
            trackUrlInput.setAttribute('required', 'required');
            
            dropArea.style.display = 'none';
            audioFile.removeAttribute('required');
            audioFile.value = ''; 
            document.querySelector('.file-msg').innerText = 'или перетащи его сюда';
        }
    });

    // Отображение имени выбранного файла
    audioFile.addEventListener('change', (e) => {
        const fileMsg = document.querySelector('.file-msg');
        if (e.target.files.length > 0) {
            fileMsg.innerText = `Выбран файл: ${e.target.files[0].name}`;
        } else {
            fileMsg.innerText = 'или перетащи его сюда';
        }
    });

    // --- ДЕМО ТРЕКИ ДЛЯ АДМИНКИ ---
    function loadPendingTracks() {
        const listContainer = document.getElementById('pendingTracksList');
        // Реализовано удаление элементов по клику на кнопки модерации (имитация)
        listContainer.innerHTML = `
            <div class="track-item" id="demo-track-1">
                <div class="track-info">
                    <h3>Локоны</h3>
                    <p>Артист: Скриптонит | Источник: YouTube Music</p>
                </div>
                <div class="track-actions">
                    <button class="btn-approve" onclick="document.getElementById('demo-track-1').remove()">✓</button>
                    <button class="btn-reject" onclick="document.getElementById('demo-track-1').remove()">✕</button>
                </div>
            </div>
            <div class="track-item" id="demo-track-2">
                <div class="track-info">
                    <h3>Прыгаю в тачку</h3>
                    <p>Артист: GreenPer Crew | Источник: Файл MP3</p>
                </div>
                <div class="track-actions">
                    <button class="btn-approve" onclick="document.getElementById('demo-track-2').remove()">✓</button>
                    <button class="btn-reject" onclick="document.getElementById('demo-track-2').remove()">✕</button>
                </div>
            </div>
        `;
    }

    // Обработка отправки формы
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        statusMessage.style.color = '#45f3ff';
        statusMessage.innerText = 'Успешно отправлено на модерацию Quach!';
        
        uploadForm.reset();
        
        // Сброс формы в дефолтное состояние (MP3 файл)
        sourceUrlGroup.style.display = 'none';
        document.getElementById('trackUrl').removeAttribute('required');
        dropArea.style.display = 'flex';
        audioFile.setAttribute('required', 'required');
        document.querySelector('.file-msg').innerText = 'или перетащи его сюда';
    });
});
