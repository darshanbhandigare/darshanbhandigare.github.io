    document.addEventListener('DOMContentLoaded', () => {
        const contactBtn = document.getElementById('contact-info-btn');
        const modal = document.getElementById('contact-modal');
        const modalContent = document.getElementById('modal-content');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const copyEmailBtn = document.getElementById('copy-email-btn');
        const emailAddress = 'darshanbhandigare9@gmail.com';
        const copyMessage = document.getElementById('copy-message');

        function openModal(event) {
            event.preventDefault();
            modal.classList.remove('hidden');

            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        function closeModal() {
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');


            setTimeout(() => {
                modal.classList.add('hidden');
                copyMessage.classList.add('hidden');
            }, 300);
        }

        function copyEmail() {

            const el = document.createElement('textarea');
            el.value = emailAddress;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);


            copyMessage.classList.remove('hidden');
            setTimeout(() => {
                copyMessage.classList.add('hidden');
            }, 2000);
        }


        if (contactBtn) contactBtn.addEventListener('click', openModal);
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);


        if (modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        if (copyEmailBtn) copyEmailBtn.addEventListener('click', copyEmail);
    });
