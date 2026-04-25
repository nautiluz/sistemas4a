const CopilotAI = {
    state: 'init',
    data: {
        nombre: '',
        empresa: '',
        equipos: '',
        servicio: '',
        email: '',
        telefono: ''
    },
    services: [
        { id: 'soporte', name: 'Soporte Tecnico', icon: 'fa-headset', section: 'soporte-remoto' },
        { id: 'infra', name: 'Infraestructura Critica', icon: 'fa-server', section: 'soporte-tecnico' },
        { id: 'cyber', name: 'Ciberseguridad', icon: 'fa-shield-alt', section: 'ciberseguridad' },
        { id: 'ia', name: 'Automatizacion IA', icon: 'fa-brain', section: 'automatizacion' },
        { id: 'redes', name: 'Redes y Conectividad', icon: 'fa-wifi', section: 'redes' },
        { id: 'recup', name: 'Recuperacion de Datos', icon: 'fa-database', section: 'recuperacion' },
        { id: 'desarrollo', name: 'Desarrollo Web', icon: 'fa-laptop-code', section: 'desarrollo' },
        { id: 'consultoria', name: 'Asesoria Estrategica', icon: 'fa-briefcase', section: 'asesoria' },
        { id: 'plan-micro', name: 'Plan Micro', icon: 'fa-desktop', section: 'planes' },
        { id: 'plan-pyme', name: 'Plan PYME', icon: 'fa-building', section: 'planes' },
        { id: 'plan-premium', name: 'Plan Premium', icon: 'fa-city', section: 'planes' },
        { id: 'plan-ilimitado', name: 'Plan Ilimitado', icon: 'fa-infinity', section: 'planes' }
    ],

    init: function() {
        this.modal = document.getElementById('ai-modal');
        this.body = document.getElementById('ai-modal-body');
        this.input = document.getElementById('ai-input');
        
        if (!this.modal || !this.body) {
            setTimeout(function() { CopilotAI.init(); }, 300);
            return;
        }

        var self = this;
        
        document.getElementById('ai-float').onclick = function() {
            self.open();
        };
        
        document.getElementById('ai-modal-close').onclick = function() {
            self.close();
        };
        
        document.getElementById('ai-send-btn').onclick = function() {
            self.handleInput();
        };
        
        this.input.onkeypress = function(e) {
            if (e.key === 'Enter') self.handleInput();
        };
    },

    open: function() {
        if (!this.modal) this.init();
        this.modal.classList.add('active');
        if (this.state === 'init') {
            this.startConversation();
        }
        if (this.input) this.input.focus();
    },

    close: function() {
        if (this.modal) this.modal.classList.remove('active');
    },

    startConversation: function() {
        this.state = 'greeting';
        this.body.innerHTML = '';
        
        this.addMessage('ai', 'Hola! Soy el asistente de Sistemas 4A. Estoy aqui para ayudarte.\n\nEscoge un servicio:');
        
        var self = this;
        setTimeout(function() {
            var html = '<div class="chat-options" style="max-height:250px;overflow-y:auto">';
            html += '<div style="font-size:11px;color:#5f6368;margin-bottom:8px">SERVICIOS</div>';
            for (var i = 0; i < 8; i++) {
                var s = self.services[i];
                html += '<div class="chat-option" onclick="CopilotAI.selectService(\'' + s.id + '\')"><i class="fas ' + s.icon + '"></i> ' + s.name + '</div>';
            }
            html += '<div style="font-size:11px;color:#5f6368;margin:12px 0 8px">PLANES</div>';
            for (var i = 8; i < 12; i++) {
                var s = self.services[i];
                html += '<div class="chat-option" onclick="CopilotAI.selectService(\'' + s.id + '\')"><i class="fas ' + s.icon + '"></i> ' + s.name + '</div>';
            }
            html += '</div>';
            self.addMessage('ai', '', html);
        }, 300);
    },

    selectService: function(serviceId) {
        var service = null;
        for (var i = 0; i < this.services.length; i++) {
            if (this.services[i].id === serviceId) {
                service = this.services[i];
                break;
            }
        }
        if (!service) return;

        this.data.servicio = service.name;
        this.addMessage('user', service.name);
        
        var self = this;
        setTimeout(function() {
            var sectionEl = document.getElementById(service.section);
            if (sectionEl) {
                sectionEl.scrollIntoView({ behavior: 'smooth' });
            }
            
            self.addMessage('ai', 'Excelente: ' + service.name + '\n\nQuieres contratar este servicio?', 
                '<div class="chat-options">' +
                '<div class="chat-option" onclick="CopilotAI.startQualification()" style="background:#34a853;color:white;border-color:#34a853">Si, quiero contratar</div>' +
                '<div class="chat-option" onclick="CopilotAI.startConversation()">Ver otro</div>' +
                '</div>'
            );
        }, 500);
    },

    startQualification: function() {
        this.state = 'nombre';
        this.addMessage('ai', 'Para procesar tu solicitud:\n\nCual es tu nombre?');
    },

    handleInput: function() {
        if (!this.input) return;
        var value = this.input.value.trim();
        if (!value) return;

        this.addMessage('user', value);
        this.input.value = '';

        if (this.state === 'nombre') {
            this.data.nombre = value;
            this.state = 'empresa';
            this.addMessage('ai', 'Gracias ' + value + '!\n\nPara que empresa trabajas? (o "personal")');
        } else if (this.state === 'empresa') {
            this.data.empresa = value.toLowerCase() === 'personal' ? 'Particular' : value;
            this.state = 'equipos';
            this.addMessage('ai', 'Cuantos equipos necesitan soporte?');
        } else if (this.state === 'equipos') {
            this.data.equipos = value;
            this.state = 'email';
            this.addMessage('ai', 'Cual es tu correo electronico?');
        } else if (this.state === 'email') {
            this.data.email = value;
            this.state = 'telefono';
            this.addMessage('ai', 'Tu numero de telefono?');
        } else if (this.state === 'telefono') {
            this.data.telefono = value;
            this.state = 'confirmar';
            this.showConfirmation();
        }
    },

    showConfirmation: function() {
        var summary = 'RESUMEN\n\n' +
            'Nombre: ' + this.data.nombre + '\n' +
            'Empresa: ' + this.data.empresa + '\n' +
            'Equipos: ' + this.data.equipos + '\n' +
            'Servicio: ' + this.data.servicio + '\n' +
            'Email: ' + this.data.email + '\n' +
            'Telefono: ' + this.data.telefono;
        
        this.addMessage('ai', summary + '\n\nSon correctos los datos?');
        
        var self = this;
        setTimeout(function() {
            self.addMessage('ai', 'Confirma para enviar:', 
                '<div class="chat-options">' +
                '<div class="chat-option" onclick="CopilotAI.sendToAllChannels()" style="background:#34a853;color:white;border-color:#34a853">Si, enviar</div>' +
                '<div class="chat-option" onclick="CopilotAI.startConversation()">Empezar de nuevo</div>' +
                '</div>'
            );
        }, 300);
    },

    formatLeadMessage: function() {
        return 'NUEVO LEAD - SISTEMAS 4A\n' +
            '------------------------\n' +
            'Nombre: ' + this.data.nombre + '\n' +
            'Empresa: ' + this.data.empresa + '\n' +
            'Equipos: ' + this.data.equipos + '\n' +
            'Email: ' + this.data.email + '\n' +
            'Telefono: ' + this.data.telefono + '\n' +
            '------------------------\n' +
            'SERVICIO: ' + this.data.servicio + '\n' +
            '------------------------\n' +
            'Fecha: ' + new Date().toLocaleString();
    },

    sendToAllChannels: function() {
        var self = this;
        this.addMessage('ai', 'Enviando solicitud...');

        var leadText = this.formatLeadMessage();
        
        try {
            localStorage.setItem('lead_' + Date.now(), JSON.stringify({
                nombre: this.data.nombre,
                empresa: this.data.empresa,
                equipos: this.data.equipos,
                servicio: this.data.servicio,
                email: this.data.email,
                telefono: this.data.telefono,
                fecha: new Date().toISOString()
            }));
        } catch(e) {}
        
        this.sendToTelegram(leadText);
        
        this.sendEmail(leadText);
        
        this.openWhatsApp(leadText);
    },

    sendToTelegram: function(message) {
        var botToken = '8729069814:AAHOhfOFL21q0U6xvRlgURg3xF8RF2JYDaU';
        var chatId = '6386477821';
        
        fetch('https://api.telegram.org/bot' + botToken + '/sendMessage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ chat_id: chatId, text: message })
        }).catch(function() {});
    },

    sendEmail: function(message) {
        var self = this;
        
        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_be3sxd4', 'template_strjzln', {
                to_email: 'nautiluz90@gmail.com',
                from_name: this.data.nombre,
                empresa: this.data.empresa,
                equipos: this.data.equipos,
                servicio: this.data.servicio,
                email: this.data.email,
                telefono: this.data.telefono
            }).then(function() {
                self.addMessage('ai', 'Email enviado correctamente!');
            }).catch(function(err) {
                self.openMailto(message);
            });
        } else {
            this.openMailto(message);
        }
    },

    openMailto: function(message) {
        var subject = encodeURIComponent('Lead Sistemas 4A: ' + this.data.servicio);
        var body = encodeURIComponent(message);
        window.open('mailto:nautiluz90@gmail.com?subject=' + subject + '&body=' + body);
    },

    openWhatsApp: function(message) {
        var phone = '584120317421';
        var text = encodeURIComponent(message);
        
        this.addMessage('ai', 'Todo enviado!',
            '<a href="https://wa.me/' + phone + '?text=' + text + '" target="_blank" class="chat-btn" style="background:#25D366;text-align:center;display:block;margin-top:8px">' +
            '<i class="fab fa-whatsapp"></i> Abrir WhatsApp' +
            '</a>' +
            '<div class="chat-option" onclick="CopilotAI.startConversation()" style="margin-top:12px;display:inline-block">Nueva consulta</div>'
        );
    },

    addMessage: function(type, text, html) {
        if (!this.body) return;
        if (!html) html = '';
        
        var div = document.createElement('div');
        div.className = 'chat-msg ' + type;
        
        var avatar = type === 'ai' ? '4A' : (this.data.nombre ? this.data.nombre.charAt(0).toUpperCase() : 'U');
        
        div.innerHTML = '<div class="chat-avatar">' + avatar + '</div><div class="chat-bubble">' + text.replace(/\n/g, '<br>') + html + '</div>';
        
        this.body.appendChild(div);
        this.body.scrollTop = this.body.scrollHeight;
    }
};

function selectPlan(plan) {
    CopilotAI.open();
    setTimeout(function() { CopilotAI.selectService('plan-' + plan); }, 300);
}

function selectService(service) {
    CopilotAI.open();
    setTimeout(function() { CopilotAI.selectService(service); }, 300);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() { CopilotAI.init(); }, 100);
});