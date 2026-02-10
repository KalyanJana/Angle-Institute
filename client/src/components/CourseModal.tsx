import { useState } from "react";
import "./CourseModal.scss";

interface CourseFormData {
  title: string;
  description: string;
  image: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
}

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => Promise<void>;
  isLoading: boolean;
}

export default function CourseModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: CourseModalProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    image: "",
    duration: "",
    level: "Beginner",
    price: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate
    if (
      !formData.title ||
      !formData.description ||
      !formData.image ||
      !formData.duration ||
      !formData.level
    ) {
      setError("All fields are required");
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({
        title: "",
        description: "",
        image: "",
        duration: "",
        level: "Beginner",
        price: 0,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to add course");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="course-modal-overlay" onClick={onClose}>
      <div className="course-modal" onClick={(e) => e.stopPropagation()}>
        <div className="course-modal-header">
          <h2>Add New Course</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label htmlFor="title">Course Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              rows={3}
              disabled={isLoading}
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="image">Image URL *</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="e.g., /images/course.jpg"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration *</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 6 months"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="level">Level *</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (Optional)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
