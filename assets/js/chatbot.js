// Chatbot Tree Structure
const chatbotData = {
    initialMessage: 'Choose one of the following options:',
    menus: {
        'main': {
            message: 'Choose one of the following options:',
            options: [
                { id: 1, text: '1) About the Academy', nextMenu: 'academy-info' },
                { id: 2, text: '2) Available Courses', nextMenu: 'courses' },
                { id: 3, text: '3) Membership Prices', nextMenu: 'pricing' },
                { id: 4, text: '4) Contact Us', nextMenu: 'contact' }
            ]
        },
        'academy-info': {
            message: 'Robus Academy is a specialized academy for teaching programming and web development. We offer practical and comprehensive courses for all levels.',
            options: []
        },
        'courses': {
            message: 'Choose the course you want to know about:',
            options: [
                { id: 1, text: '1) JavaScript', nextMenu: 'course-js' },
                { id: 2, text: '2) React', nextMenu: 'course-react' },
                { id: 3, text: '3) Python', nextMenu: 'course-python' }
            ]
        },
        'course-js': {
            message: 'JavaScript course includes basics and advanced levels. Duration: 8 weeks.',
            options: []
        },
        'course-react': {
            message: 'React course specializes in building modern web applications. Duration: 6 weeks.',
            options: []
        },
        'course-python': {
            message: 'Python course for beginners to advanced level. Duration: 10 weeks.',
            options: []
        },
        'pricing': {
            message: 'Our memberships:\n💳 Basic Plan: $99/month\n💳 Premium Plan: $199/month\n💳 Best Plan: $299/month',
            options: []
        },
        'contact': {
            message: 'You can contact us via:\n📱 WhatsApp: https://wa.me/robusacademy\n📧 Email: contact@robusacademy.com\n🌐 Website: www.robusacademy.com',
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
        this.conversationKey = 'chatbotConversation'; // Store full conversation with options
        
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
    }

    closeChat() {
        this.chatWindow.classList.add('hidden');
    }

    displayInitialMessage() {
        // Check if there are saved conversations
        try {
            const savedConversation = JSON.parse(localStorage.getItem(this.conversationKey)) || [];
            if (savedConversation.length > 0) {
                // Load saved conversation
                this.loadChatHistory();
                return;
            }
        } catch (error) {
            console.error('Error checking saved conversation:', error);
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
        const currentMenuData = chatbotData.menus[this.currentMenu];
        const options = currentMenuData && currentMenuData.options ? currentMenuData.options.map(o => ({text: o.text, id: o.id})) : [];
        
        this.saveMessage({
            type: 'bot',
            content: message,
            timestamp: timestamp,
            menuId: this.currentMenu,
            optionCount: options.length
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
        
        // Save message to localStorage with selected option
        this.saveMessage({
            type: 'user',
            content: message,
            timestamp: timestamp,
            selectedOption: parseInt(message)
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
            returnBtn.textContent = `${returnBtnNumber}) Return to Main Menu`;
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

    disableAllOptions() {
        const buttons = this.chatBody.querySelectorAll('.options-container button');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('btn-outline-success', 'btn-outline-warning');
            btn.classList.add('btn-outline-secondary');
            btn.style.opacity = '0.6';
            btn.style.cursor = 'not-allowed';
            btn.style.border = '2px solid #6c757d';
        });
    }

    highlightSelectedOption(selectedOptionNumber) {
        // Get the last options container (the one we just added)
        const optionsContainers = this.chatBody.querySelectorAll('.options-container');
        if (optionsContainers.length === 0) return;
        
        const lastOptionsContainer = optionsContainers[optionsContainers.length - 1];
        const buttons = lastOptionsContainer.querySelectorAll('button');
        
        buttons.forEach((btn, index) => {
            if (index + 1 === selectedOptionNumber) {
                btn.style.borderColor = '#FFD700';
                btn.style.borderWidth = '2px';
                btn.style.backgroundColor = 'rgba(255, 215, 0, 0.15)';
            }
        });
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

        // Disable all options and highlight selected one
        this.disableAllOptions();
        this.highlightSelectedOption(optionIndex);

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

        // Disable all options and highlight selected one
        this.disableAllOptions();
        this.highlightSelectedOption(optionNumber);

        // Return to main menu
        this.currentMenu = 'main';
        this.saveMenuState(this.currentMenu);
        const mainMenuData = chatbotData.menus['main'];
        
        setTimeout(() => {
            this.displayBotMessage('Returned to Main Menu. Please choose an option:');
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
            // Disable all options and highlight selected one
            this.disableAllOptions();
            this.highlightSelectedOption(optionId);

            // Check if it's the return button
            if (optionId === options.length + 1 && this.currentMenu !== 'main') {
                this.returnToMainMenuFromInput();
            } else if (optionId >= 1 && optionId <= options.length) {
                this.handleOptionClickFromInput(optionId);
            }
        } else {
            // Invalid option
            setTimeout(() => {
                this.displayBotMessage(`Sorry, the option is incorrect. Please choose a number from 1 to ${maxOptionNumber}.`);
            }, 500);
        }

        // Clear input field
        this.inputField.value = '';
    }

    handleOptionClickFromInput(optionIndex) {
        const currentMenuData = chatbotData.menus[this.currentMenu];
        const options = currentMenuData.options || [];
        
        const selectedOption = options[optionIndex - 1];
        
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
    }

    returnToMainMenuFromInput() {
        // Return to main menu
        this.currentMenu = 'main';
        this.saveMenuState(this.currentMenu);
        const mainMenuData = chatbotData.menus['main'];
        
        setTimeout(() => {
            this.displayBotMessage('Returned to Main Menu. Please choose an option:');
            this.displayOptions();
        }, 500);
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
            let conversation = JSON.parse(localStorage.getItem(this.conversationKey)) || [];
            conversation.push(messageObj);
            localStorage.setItem(this.conversationKey, JSON.stringify(conversation));
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
            const conversation = JSON.parse(localStorage.getItem(this.conversationKey)) || [];
            const savedMenuState = this.getMenuState();
            
            // If there are saved messages, display them
            if (conversation.length > 0) {
                // Clear current content
                this.chatBody.innerHTML = '';
                
                // Restore the menu state
                this.currentMenu = savedMenuState;
                
                // Reconstruct the conversation with proper order: bot message -> options -> user message
                let i = 0;
                while (i < conversation.length) {
                    const msg = conversation[i];
                    
                    if (msg.type === 'bot') {
                        // Display bot message
                        this.displayMessageInHistory(msg);
                        
                        // Check if this is the last bot message (don't show disabled options for it)
                        let isLastBotMessage = false;
                        if (i === conversation.length - 1 || 
                            (i + 1 < conversation.length && conversation[i + 1].type === 'user' && i + 1 === conversation.length - 1)) {
                            isLastBotMessage = true;
                        }
                        
                        // Display options for this bot message only if it's not the last one
                        if (!isLastBotMessage) {
                            const menuData = chatbotData.menus[msg.menuId];
                            if (menuData) {
                                const options = menuData.options || [];
                                // Show options if there are any, or if menu is not main (so return button can show)
                                if (options.length > 0 || msg.menuId !== 'main') {
                                    this.displayOptionsInHistory(options, msg.menuId, false);
                                }
                            }
                        }
                        
                        // Check if next message is user message
                        if (i + 1 < conversation.length && conversation[i + 1].type === 'user') {
                            i++;
                            const userMsg = conversation[i];
                            
                            // Display user message
                            this.displayMessageInHistory(userMsg);
                            
                            // Highlight the selected option
                            if (userMsg.selectedOption) {
                                this.highlightSelectedOption(userMsg.selectedOption);
                            }
                        }
                    } else if (msg.type === 'user' && (i === 0 || conversation[i - 1].type === 'user')) {
                        // Orphan user message (shouldn't happen, but just in case)
                        this.displayMessageInHistory(msg);
                    }
                    
                    i++;
                }
                
                // Display current options based on saved menu state
                const currentMenuData = chatbotData.menus[this.currentMenu];
                const currentOptions = currentMenuData.options || [];
                
                if (currentOptions.length > 0 || this.currentMenu !== 'main') {
                    this.displayOptionsInHistory(currentOptions, this.currentMenu, true);
                }
                
                this.scrollToBottom();
            }
        } catch (error) {
            console.error('Error loading chat history from localStorage:', error);
        }
    }

    displayMessageInHistory(msg) {
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
    }

    displayOptionsInHistory(options, menuId, isActive = false) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-container mt-2';
        
        // Display all options
        options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.type = 'button';
            
            if (isActive) {
                // Active options (current menu)
                optionBtn.className = 'btn btn-outline-success btn-sm w-100 mb-2 text-start';
                optionBtn.style.fontSize = '1rem';
                optionBtn.style.padding = '0.6rem 0.8rem';
                optionBtn.style.opacity = '1';
                optionBtn.style.cursor = 'pointer';
                optionBtn.style.border = '1px solid';
                optionBtn.disabled = false;
                optionBtn.dataset.optionId = index + 1;
                optionBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleOptionClick(index + 1);
                });
            } else {
                // Disabled options (previous messages)
                optionBtn.className = 'btn btn-outline-secondary btn-sm w-100 mb-2 text-start';
                optionBtn.style.fontSize = '1rem';
                optionBtn.style.padding = '0.6rem 0.8rem';
                optionBtn.style.opacity = '0.6';
                optionBtn.style.cursor = 'not-allowed';
                optionBtn.style.border = '2px solid #6c757d';
                optionBtn.disabled = true;
            }
            
            optionBtn.textContent = option.text;
            optionsDiv.appendChild(optionBtn);
        });
        
        // Add return button if not at main menu
        if (menuId !== 'main') {
            const returnBtn = document.createElement('button');
            returnBtn.type = 'button';
            
            if (isActive) {
                // Active return button
                returnBtn.className = 'btn btn-outline-warning btn-sm w-100 mb-2 text-start';
                returnBtn.style.fontSize = '1rem';
                returnBtn.style.padding = '0.6rem 0.8rem';
                returnBtn.style.opacity = '1';
                returnBtn.style.cursor = 'pointer';
                returnBtn.style.border = '1px solid';
                returnBtn.disabled = false;
                returnBtn.dataset.optionId = 'return-main';
                returnBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.returnToMainMenu();
                });
            } else {
                // Disabled return button
                returnBtn.className = 'btn btn-outline-secondary btn-sm w-100 mb-2 text-start';
                returnBtn.style.fontSize = '1rem';
                returnBtn.style.padding = '0.6rem 0.8rem';
                returnBtn.style.opacity = '0.6';
                returnBtn.style.cursor = 'not-allowed';
                returnBtn.style.border = '2px solid #6c757d';
                returnBtn.disabled = true;
            }
            
            const returnBtnNumber = options.length + 1;
            returnBtn.textContent = `${returnBtnNumber}) Return to Main Menu`;
            optionsDiv.appendChild(returnBtn);
        }
        
        this.chatBody.appendChild(optionsDiv);
    }

    clearChatHistory() {
        try {
            localStorage.removeItem(this.conversationKey);
            localStorage.removeItem(this.menuStorageKey);
            this.chatBody.innerHTML = '';
            this.currentMenu = 'main';
            this.saveMenuState(this.currentMenu);
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
