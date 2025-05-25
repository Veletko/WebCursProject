import { allServices, renderAdminPage, currentAdminPage } from "./loadServicesForAdmin.js";

let currentEditingServiceId = null;
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-service-form');

export function openEditModal(service) {
    if (!service || !editModal) return;

    currentEditingServiceId = service.id;

    document.getElementById('edit-title').value = service.title.en || '';
    document.getElementById('edit-description').value = service.description.en || '';
    document.getElementById('edit-price').value = service.price || '';
    document.getElementById('edit-duration').value = service.duration || '';
    document.getElementById('edit-category').value = service.category || '';
    document.getElementById('edit-image').value = service.image || '';

    editModal.classList.add('open');
    document.body.classList.add('modal-open');
}

export async function handleServiceUpdate(updatedData) {
    try {
        const response = await fetch(`http://localhost:3000/services/${currentEditingServiceId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update service: ${errorText}`);
        }

        const updatedService = await response.json();

        const index = allServices.findIndex((s) => s.id == updatedService.id);
        if (index !== -1) {
            allServices[index] = updatedService;
        } else {
            console.error('Service not found in allServices:', updatedService.id);
        }
        return updatedService;
    } catch (error) {
        console.error('Update error:', error);
        throw error;
    }
}

if (editForm) {
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedData = {
            title: { en: document.getElementById('edit-title').value },
            description: { en: document.getElementById('edit-description').value },
            price: document.getElementById('edit-price').value,
            duration: document.getElementById('edit-duration').value,
            category: document.getElementById('edit-category').value,
            image: document.getElementById('edit-image').value,
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
            await handleServiceUpdate(updatedData);
            alert('Service updated successfully!');
            closeEditModal();
            renderAdminPage(currentAdminPage); 
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
}

if (document.getElementById('close-edit-modal')) {
    document.getElementById('close-edit-modal').addEventListener('click', closeEditModal);
}

function closeEditModal() {
    if (editModal) {
        editModal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }
    currentEditingServiceId = null;
}