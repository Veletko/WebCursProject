import { allServices, renderAdminPage, currentAdminPage } from "./loadServicesForAdmin.js";

const addModal = document.getElementById('add-modal');
const addForm = document.getElementById('add-service-form');

export function openAddModal() {
    if (!addModal || !addForm) {
        console.error('Add modal or form element is missing');
        return;
    }

    document.getElementById('add-title').value = '';
    document.getElementById('add-description').value = '';
    document.getElementById('add-price').value = '';
    document.getElementById('add-duration').value = '';
    document.getElementById('add-category').value = '';
    document.getElementById('add-image').value = '';

    addModal.classList.add('open');
    document.body.classList.add('modal-open');
}

export async function handleServiceCreate(newData) {
    try {
        const response = await fetch(`http://localhost:3000/services`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create service: ${errorText}`);
        }

        const newService = await response.json();
        allServices.push(newService);
        console.log('New service added:', newService);
        return newService;
    } catch (error) {
        console.error('Create error:', error);
        throw error;
    }
}

if (addForm) {
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newData = {
            title: { en: document.getElementById('add-title').value },
            description: { en: document.getElementById('add-description').value },
            price: document.getElementById('add-price').value,
            duration: document.getElementById('add-duration').value,
            category: document.getElementById('add-category').value,
            image: document.getElementById('add-image').value,
        };

        if (
            !newData.title.en ||
            !newData.description.en ||
            !newData.price ||
            !newData.duration ||
            !newData.category ||
            !newData.image
        ) {
            alert('Please fill in all required fields');
            return;
        }

        const priceValue = parseFloat(newData.price);
        const durationValue = parseInt(newData.duration, 10);
        if (isNaN(priceValue) || priceValue <= 0) {
            alert('Price must be a positive number');
            return;
        }
        if (isNaN(durationValue) || durationValue <= 0) {
            alert('Duration must be a positive integer');
            return;
        }

        try {
            await handleServiceCreate(newData);
            alert('Service created successfully!');
            closeAddModal();
            renderAdminPage(currentAdminPage);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
}

if (addModal) {
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) closeAddModal();
    });
}

if (document.getElementById('close-add-modal')) {
    document.getElementById('close-add-modal').addEventListener('click', closeAddModal);
}

function closeAddModal() {
    if (addModal) {
        addModal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }
}