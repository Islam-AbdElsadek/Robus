// Chatbot Tree Structure
const chatbotData = {
    initialMessage: 'اختر واحدة من الخيارات التالية:',
    menus: {
        'main': {
            message: 'اختر واحدة من الخيارات التالية:',
            options: [
                { id: 1, text: '1 معلومات عن الأكاديمية', nextMenu: 'academy-info' },
                { id: 2, text: '2 الكورسات المتاحة', nextMenu: 'courses' },
                { id: 3, text: '3 أسعار العضويات', nextMenu: 'pricing' },
                { id: 4, text: '4 تواصل معنا', nextMenu: 'contact' }
            ]
        },
        'academy-info': {
            message: 'Robus Academy هي أكاديمية متخصصة في تعليم البرمجة وتطوير الويب. نقدم كورسات عملية وشاملة لجميع المستويات.',
            options: []
        },
        'courses': {
            message: 'اختر الكورس الذي تريد معرفة معلومات عنه:',
            options: [
                { id: 1, text: '1 JavaScript', nextMenu: 'course-js' },
                { id: 2, text: '2 React', nextMenu: 'course-react' },
                { id: 3, text: '3 Python', nextMenu: 'course-python' }
            ]
        },
        'course-js': {
            message: 'كورس JavaScript يشمل الأساسيات والمستويات المتقدمة. المدة: 8 أسابيع.',
            options: []
        },
        'course-react': {
            message: 'كورس React متخصص في بناء تطبيقات ويب حديثة. المدة: 6 أسابيع.',
            options: []
        },
        'course-python': {
            message: 'كورس Python للمبتدئين وحتى المستوى المتقدم. المدة: 10 أسابيع.',
            options: []
        },
        'pricing': {
            message: 'العضويات لدينا:\n💳 الباقة الأساسية: 99 ج.م/شهر\n💳 الباقة المتقدمة: 199 ج.م/شهر\n💳 الباقة الأفضل: 299 ج.م/شهر',
            options: []
        },
        'contact': {
            message: 'يمكنك التواصل معنا عبر:\n📱 WhatsApp: https://wa.me/robusacademy\n📧 Email: contact@robusacademy.com\n🌐 الموقع: www.robusacademy.com',
            options: []
        }
    }
};

class Chatbot {
    constructor() {
        this.chatWindow = document.getElementById('chatWindow');
        this.chatBtn = document.getElementById('chatbot-btn');
        this.closeBtn = document.getElementById('closeChatBtn');
        this.chatBody = this.chatWindow.querySelector('.card-body');
        this.chatFooter = this.chatWindow.querySelector('.card-footer');
        this.inputField = this.chatFooter.querySelector('input[type="number"]');
        this.sendBtn = this.chatFooter.querySelector('a');
        
        this.currentMenu = 'main'; // Track current menu
        this.optionCounter = 0; // Track option numbering for current menu
        this.storageKey = 'chatbotMessages'; // LocalStorage key
        this.menuStorageKey = 'chatbotCurrentMenu'; // Store current menu state
        
        this.init();
    }

    init() {
        // Show/Hide chat window
        this.chatBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());

        // Send message on Enter or button click
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserMessage();
            }
        });
        this.sendBtn.addEventListener('click', () => this.handleUserMessage());

        // Display initial message
        this.displayInitialMessage();
    }

    toggleChat() {
        this.chatWindow.classList.toggle('hidden');
        
        // Load saved messages and menu state when opening chat
        if (!this.chatWindow.classList.contains('hidden')) {
            this.loadChatHistory();
        }
    }

    closeChat() {
        this.chatWindow.classList.add('hidden');
    }

    displayInitialMessage() {
        // Check if there are saved messages
        try {
            const savedMessages = JSON.parse(localStorage.getItem(this.storageKey)) || [];
            if (savedMessages.length > 0) {
                this.loadChatHistory();
                return;
            }
        } catch (error) {
            console.error('Error checking saved messages:', error);
        }

        // Clear previous messages
        this.chatBody.innerHTML = '';
        this.currentMenu = 'main';
        this.saveMenuState(this.currentMenu);

        // Display bot initial message
        this.displayBotMessage(chatbotData.menus['main'].message);

        // Display options
        this.displayOptions();
    }

    displayBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'd-flex flex-row justify-content-start mb-3';
        
        const timestamp = new Date().getTime();
        const formattedTime = this.getFormattedTime(timestamp);
        
        const botMessageContent = `
            <img src="assets/img/chatbot/chatbot1.svg" alt="bot" style="width: 45px; height: 45px; border-radius: 50%; margin-right: 10px;">
            <div>
                <p class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary text-wrap">${message}</p>
                <small class="ms-3 text-muted" style="font-size: 0.75rem;">${formattedTime}</small>
            </div>
        `;
        
        messageDiv.innerHTML = botMessageContent;
        this.chatBody.appendChild(messageDiv);
        
        // Save message to localStorage
        this.saveMessage({
            type: 'bot',
            content: message,
            timestamp: timestamp
        });
        
        this.scrollToBottom();
    }

    displayUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'd-flex flex-row justify-content-end mb-3';
        
        const timestamp = new Date().getTime();
        const formattedTime = this.getFormattedTime(timestamp);
        
        const userMessageContent = `
            <div>
                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${message}</p>
                <small class="me-3 text-muted" style="font-size: 0.75rem; display: block; text-align: right;">${formattedTime}</small>
            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="user" style="width: 45px; height: 45px; border-radius: 50%;">
        `;
        
        messageDiv.innerHTML = userMessageContent;
        this.chatBody.appendChild(messageDiv);
        
        // Save message to localStorage
        this.saveMessage({
            type: 'user',
            content: message,
            timestamp: timestamp
        });
        
        this.scrollToBottom();
    }

    displayOptions() {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-container mt-2';
        
        const currentMenuData = chatbotData.menus[this.currentMenu];
        const options = currentMenuData.options || [];
        
        // Display all options with numbering
        options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.type = 'button';
            optionBtn.className = 'btn btn-outline-success btn-sm w-100 mb-2 text-start';
            optionBtn.style.fontSize = '1rem';
            optionBtn.style.padding = '0.6rem 0.8rem';
            optionBtn.textContent = option.text;
            optionBtn.dataset.optionId = index + 1;
            optionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleOptionClick(index + 1);
            });
            optionsDiv.appendChild(optionBtn);
        });
        
        // Add "Return to Main Menu" option if not already at main menu
        if (this.currentMenu !== 'main') {
            const returnBtn = document.createElement('button');
            returnBtn.type = 'button';
            returnBtn.className = 'btn btn-outline-warning btn-sm w-100 mb-2 text-start';
            returnBtn.style.fontSize = '1rem';
            returnBtn.style.padding = '0.6rem 0.8rem';
            const returnBtnNumber = options.length + 1;
            returnBtn.textContent = `${returnBtnNumber}️⃣ العودة للقائمة الرئيسية`;
            returnBtn.dataset.optionId = 'return-main';
            returnBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.returnToMainMenu();
            });
            optionsDiv.appendChild(returnBtn);
        }
        
        // If no options at all (empty menu), just show return button
        if (options.length === 0 && this.currentMenu === 'main') {
            optionsDiv.innerHTML = '';
        }
        
        this.chatBody.appendChild(optionsDiv);
        this.scrollToBottom();
    }

    handleOptionClick(optionIndex) {
        const currentMenuData = chatbotData.menus[this.currentMenu];
        const options = currentMenuData.options || [];
        
        // Validate option number
        if (optionIndex < 1 || optionIndex > options.length) {
            return;
        }
        
        const selectedOption = options[optionIndex - 1];
        
        // Display user message (just the number)
        this.displayUserMessage(`${optionIndex}`);

        // Remove options
        const optionsContainer = this.chatBody.querySelector('.options-container');
        if (optionsContainer) {
            optionsContainer.remove();
        }

        // Move to next menu
        const nextMenuId = selectedOption.nextMenu;
        if (nextMenuId && chatbotData.menus[nextMenuId]) {
            this.currentMenu = nextMenuId;
            this.saveMenuState(this.currentMenu);
            const nextMenuData = chatbotData.menus[nextMenuId];
            
            setTimeout(() => {
                this.displayBotMessage(nextMenuData.message);
                this.displayOptions();
            }, 500);
        }

        // Clear input field
        this.inputField.value = '';
    }

    returnToMainMenu() {
        // Display user message
        const currentMenuData = chatbotData.menus[this.currentMenu];
        const optionNumber = (currentMenuData.options || []).length + 1;
        this.displayUserMessage(`${optionNumber}`);

        // Remove options
        const optionsContainer = this.chatBody.querySelector('.options-container');
        if (optionsContainer) {
            optionsContainer.remove();
        }

        // Return to main menu
        this.currentMenu = 'main';
        this.saveMenuState(this.currentMenu);
        const mainMenuData = chatbotData.menus['main'];
        
        setTimeout(() => {
            this.displayBotMessage('تم العودة للقائمة الرئيسية. اختر خياراً من فضلك:');
            this.displayOptions();
        }, 500);

        // Clear input field
        this.inputField.value = '';
    }

    handleUserMessage() {
        const userMessage = this.inputField.value.trim();
        
        if (!userMessage) return;

        // Display user message
        this.displayUserMessage(userMessage);

        // Check if message is a valid option number
        const optionId = parseInt(userMessage);
        const currentMenuData = chatbotData.menus[this.currentMenu];
        const options = currentMenuData.options || [];
        const maxOptionNumber = options.length + (this.currentMenu !== 'main' ? 1 : 0);
        
        if (optionId >= 1 && optionId <= maxOptionNumber) {
            // Remove options if they exist
            const optionsContainer = this.chatBody.querySelector('.options-container');
            if (optionsContainer) {
                optionsContainer.remove();
            }

            // Check if it's the return button
            if (optionId === options.length + 1 && this.currentMenu !== 'main') {
                this.returnToMainMenu();
            } else if (optionId >= 1 && optionId <= options.length) {
                this.handleOptionClick(optionId);
            }
        } else {
            // Invalid option
            setTimeout(() => {
                this.displayBotMessage(`عذراً، الخيار غير صحيح. الرجاء اختيار رقم من 1 إلى ${maxOptionNumber}.`);
            }, 500);
        }

        // Clear input field
        this.inputField.value = '';
    }

    scrollToBottom() {
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }

    getFormattedTime(timestamp) {
        const messageDate = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Helper function to format time in 12-hour format
        const formatTime = (date) => {
            let hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
            hours = String(hours).padStart(2, '0');
            return `${hours}:${minutes} ${ampm}`;
        };

        // Helper function to check if same day
        const isSameDay = (date1, date2) => {
            return date1.getFullYear() === date2.getFullYear() &&
                   date1.getMonth() === date2.getMonth() &&
                   date1.getDate() === date2.getDate();
        };

        const time = formatTime(messageDate);

        // Same day - show only time
        if (isSameDay(messageDate, today)) {
            return time;
        }

        // Yesterday
        if (isSameDay(messageDate, yesterday)) {
            return `Yesterday ${time}`;
        }

        // Same week (within 7 days)
        const daysDifference = Math.floor((today - messageDate) / (1000 * 60 * 60 * 24));
        if (daysDifference < 7) {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNames[messageDate.getDay()];
            return `${dayName} ${time}`;
        }

        // Older messages - show full date and time
        const day = String(messageDate.getDate()).padStart(2, '0');
        const month = String(messageDate.getMonth() + 1).padStart(2, '0');
        const year = messageDate.getFullYear();
        return `${day}/${month}/${year} ${time}`;
    }

    saveMessage(messageObj) {
        try {
            let messages = JSON.parse(localStorage.getItem(this.storageKey)) || [];
            messages.push(messageObj);
            localStorage.setItem(this.storageKey, JSON.stringify(messages));
        } catch (error) {
            console.error('Error saving message to localStorage:', error);
        }
    }

    saveMenuState(menuId) {
        try {
            localStorage.setItem(this.menuStorageKey, menuId);
        } catch (error) {
            console.error('Error saving menu state to localStorage:', error);
        }
    }

    getMenuState() {
        try {
            return localStorage.getItem(this.menuStorageKey) || 'main';
        } catch (error) {
            console.error('Error retrieving menu state from localStorage:', error);
            return 'main';
        }
    }

    loadChatHistory() {
        try {
            const messages = JSON.parse(localStorage.getItem(this.storageKey)) || [];
            const savedMenuState = this.getMenuState();
            
            // If there are saved messages, display them
            if (messages.length > 0) {
                // Clear current content but keep any existing options
                const optionsContainer = this.chatBody.querySelector('.options-container');
                this.chatBody.innerHTML = '';
                if (optionsContainer) {
                    this.chatBody.appendChild(optionsContainer);
                }
                
                // Restore the menu state
                this.currentMenu = savedMenuState;
                
                // Display all saved messages without re-saving them
                messages.forEach(msg => {
                    const formattedTime = this.getFormattedTime(msg.timestamp);
                    const messageDiv = document.createElement('div');
                    
                    if (msg.type === 'bot') {
                        messageDiv.className = 'd-flex flex-row justify-content-start mb-3';
                        messageDiv.innerHTML = `
                            <img src="assets/img/chatbot/chatbot1.svg" alt="bot" style="width: 45px; height: 45px; border-radius: 50%; margin-right: 10px;">
                            <div>
                                <p class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary text-wrap">${msg.content}</p>
                                <small class="ms-3 text-muted" style="font-size: 0.75rem;">${formattedTime}</small>
                            </div>
                        `;
                    } else {
                        messageDiv.className = 'd-flex flex-row justify-content-end mb-3';
                        messageDiv.innerHTML = `
                            <div>
                                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${msg.content}</p>
                                <small class="me-3 text-muted" style="font-size: 0.75rem; display: block; text-align: right;">${formattedTime}</small>
                            </div>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="user" style="width: 45px; height: 45px; border-radius: 50%;">
                        `;
                    }
                    
                    this.chatBody.appendChild(messageDiv);
                });
                
                // Display current options based on saved menu state
                this.displayOptions();
                this.scrollToBottom();
            }
        } catch (error) {
            console.error('Error loading chat history from localStorage:', error);
        }
    }

    clearChatHistory() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.menuStorageKey);
            this.chatBody.innerHTML = '';
            this.currentMenu = 'main';
            this.displayInitialMessage();
        } catch (error) {
            console.error('Error clearing chat history:', error);
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
