package com.secureai.exampro.service;

import com.secureai.exampro.entity.StudentAnswer;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.Question;
import com.secureai.exampro.repository.StudentAnswerRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentAnswerServiceImpl implements StudentAnswerService {

    private final StudentAnswerRepository studentAnswerRepository;

    // Constructor Injection
    public StudentAnswerServiceImpl(
            StudentAnswerRepository studentAnswerRepository) {

        this.studentAnswerRepository = studentAnswerRepository;
    }

    // Submit student answer
@Override
public StudentAnswer submitAnswer(
        StudentAnswer studentAnswer) {

    ExamSession session = studentAnswer.getSession();
    Question question = studentAnswer.getQuestion();

    var existingAnswer =
            studentAnswerRepository
            .findBySessionAndQuestion(
                    session,
                    question
            );

    if (existingAnswer.isPresent()) {

        StudentAnswer answer =
                existingAnswer.get();

        answer.setOption(
                studentAnswer.getOption()
        );

        answer.setAnswerText(
                studentAnswer.getAnswerText()
        );

        return studentAnswerRepository
                .save(answer);
    }

    return studentAnswerRepository
            .save(studentAnswer);
}
    // Get all answers
    @Override
    public List<StudentAnswer> getAllAnswers() {

        return studentAnswerRepository.findAll();
    }

    // Get answer by ID
    @Override
    public StudentAnswer getAnswerById(Long id) {

        return studentAnswerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Answer not found with ID: " + id));
    }

    // Get all answers of an exam session
    @Override
    public List<StudentAnswer> getAnswersBySession(
            ExamSession session) {

        return studentAnswerRepository.findBySession(session);
    }

    // Get answer by question
    @Override
    public StudentAnswer getAnswerByQuestion(
            ExamSession session,
            Question question) {

        return studentAnswerRepository
                .findBySessionAndQuestion(session, question)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Answer not found"));
    }

    // Check if question is answered
    @Override
    public boolean isQuestionAnswered(
            ExamSession session,
            Question question) {

        return studentAnswerRepository
                .existsBySessionAndQuestion(session, question);
    }

    // Update student answer
    @Override
    public StudentAnswer updateAnswer(
            Long id,
            StudentAnswer studentAnswer) {

        StudentAnswer existingAnswer = getAnswerById(id);

        existingAnswer.setOption(
                studentAnswer.getOption());

        existingAnswer.setAnswerText(
                studentAnswer.getAnswerText());

        return studentAnswerRepository.save(existingAnswer);
    }

    // Delete answer
    @Override
    public void deleteAnswer(Long id) {

        StudentAnswer answer = getAnswerById(id);

        studentAnswerRepository.delete(answer);
    }

    // Count submitted answers
    @Override
    public long countAnswers(
            ExamSession session) {

        return studentAnswerRepository.countBySession(session);
    }
}