document.addEventListener('DOMContentLoaded', function() {
            const percentageSelect = document.getElementById("percentage");
            const presentInput = document.getElementById("present-input");
            const totalInput = document.getElementById("total-input");
            const btn = document.getElementById("btn");
            const outputDiv = document.getElementById("output-div");
            const banner = document.getElementById("banner");
            const modal = document.getElementById("result-modal");
            const closeBtn = document.querySelector(".close-btn");
            const progressFill = document.querySelector(".progress-fill");
            const progressText = document.querySelector(".progress-text");

            // Add animation to inputs
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                });
            });

            // Button click animation
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            btn.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });

            // Close modal when clicking the close button
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            });

            // Close modal when clicking outside the modal content
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 300);
                }
            });

            // Main calculation logic
            btn.addEventListener("click", () => {
                let present = parseInt(presentInput.value);
                let total = parseInt(totalInput.value);
                let percentage = parseInt(percentageSelect.value);
                
                if (isNaN(present) || isNaN(total) || isNaN(percentage)) {
                    showError("Chusi Type chay 💩 ! (please enter valid details) ");
                    return;
                }

                if (present < 0 || total <= 0 || present > total) {
                    showError("Chusi Type chay 💩 ! (please enter valid details) ");
                    return;
                }

                // Calculate current attendance percentage
                const currentPercentage = (present / total) * 100;
                
                // Update progress bar
                updateProgressBar(currentPercentage);

                if (present / total >= percentage / 100) {
                    const daysAvailableToBunk = daysToBunk(present, total, percentage);
                    outputDiv.innerHTML = daysToBunkText(
                        daysAvailableToBunk,
                        present,
                        total
                    );
                    showSuccess();
                } else {
                    const attendanceNeeded = reqAttendance(present, total, percentage);
                    outputDiv.innerHTML = daysToAttendClassText(
                        attendanceNeeded,
                        present,
                        total,
                        percentage
                    );
                    showWarning();
                }

                // Show modal with animation
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            });

            const reqAttendance = (present, total, percentage) => {
                return Math.ceil((percentage * total - 100 * present) / (100 - percentage));
            };

            const daysToBunk = (present, total, percentage) => {
                return Math.floor((100 * present - percentage * total) / percentage);
            };

            const daysToBunkText = (daysAvailableToBunk, present, total) =>
                `Bunk Mingachu mawa😂 <strong>${daysAvailableToBunk}</strong> more days.<br>Current Attendance: <strong>${present}/${total}</strong> -> <strong>${(
                    (present / total) *
                    100
                ).toFixed(2)}%</strong><br>Attendance Then: <strong>${present}/${
                    daysAvailableToBunk + total
                }</strong> -> <strong>${(
                    (present / (daysAvailableToBunk + total)) *
                    100
                ).toFixed(2)}%</strong>`;

            const daysToAttendClassText = (attendanceNeeded, present, total, percentage) =>
                `You need to attend <strong>${attendanceNeeded}</strong> more classes to attain ${percentage}% attendance<br>Current Attendance: <strong>${present}/${total}</strong> ->  <strong>${(
                    (present / total) *
                    100
                ).toFixed(2)}%</strong><br>Attendance Required: <strong>${
                    attendanceNeeded + present
                }/${attendanceNeeded + total}</strong> -> <strong>${(
                    ((attendanceNeeded + present) / (attendanceNeeded + total)) *
                    100
                ).toFixed(2)}%</strong>`;

            function showError(message) {
                outputDiv.innerText = message;
                modal.querySelector('.modal-content').style.borderTop = '5px solid var(--danger-color)';
                updateProgressBar((parseInt(presentInput.value) / parseInt(totalInput.value)) * 100 || 0);
                
                // Show modal with animation
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            }

            function showSuccess() {
                modal.querySelector('.modal-content').style.borderTop = '5px solid var(--success-color)';
            }

            function showWarning() {
                modal.querySelector('.modal-content').style.borderTop = '5px solid var(--warning-color)';
            }

            function updateProgressBar(percentage) {
                // Ensure percentage is between 0 and 100
                percentage = Math.max(0, Math.min(100, percentage));
                
                // Animate the progress bar
                setTimeout(() => {
                    progressFill.style.width = `${percentage}%`;
                    progressText.textContent = `${percentage.toFixed(2)}%`;
                    
                    // Change color based on percentage
                    if (percentage >= parseInt(percentageSelect.value)) {
                        progressFill.style.background = 'linear-gradient(to right, #00b894, #00cec9)';
                    } else if (percentage >= parseInt(percentageSelect.value) * 0.9) {
                        progressFill.style.background = 'linear-gradient(to right, #fdcb6e, #e17055)';
                    } else {
                        progressFill.style.background = 'linear-gradient(to right, #ff7675, #d63031)';
                    }
                }, 300);
            }

            // Add some initial animations
            document.querySelectorAll('.form-group').forEach((group, index) => {
                group.style.opacity = '0';
                group.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    group.style.opacity = '1';
                    group.style.transform = 'translateY(0)';
                }, 100 + index * 100);
            });

            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, box-shadow 0.3s ease';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 500);
        });